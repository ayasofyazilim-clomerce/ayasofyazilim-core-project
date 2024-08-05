"use client";
import type { ResetPasswordFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/reset-password-form";
import type { authTypes } from "@repo/ayasofyazilim-ui/pages/auth";
import { Auth, isAuthType } from "@repo/ayasofyazilim-ui/pages/auth";
import { Logo } from "@repo/ui/logo";
import NextError from "next/error";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useLocale } from "src/providers/locale";
import {
  sendPasswordResetCodeServer,
  signInServer,
  signUpServer,
} from "auth-action";
import "../../globals.css";
import { useApplication } from "src/providers/application";

export default function Page(): JSX.Element {
  const { cultureName, resources, changeLocale } = useLocale();
  const router = useRouter();
  const params = useParams();
  const { appName } = useApplication();
  const searchParams = useSearchParams();
  const authTypeParam = params.auth as authTypes;
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null,
  );
  if (!isAuthType(authTypeParam)) {
    return (
      <NextError
        statusCode={404}
        title={resources.AbpUi?.texts?.PageNotFound}
      />
    );
  }

  //Login start

  const loginFormSchema = z.object({
    userIdentifier: z.string().min(5),
    password: z.string().min(4).max(32),
    tenantId: z.string(),
  });

  const registerFormSchema = z.object({
    userName: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(4).max(32),
    //tenantId: z.string(),
  });
  //Login end
  //Register waiting for implementation
  //ResetPassword start
  const onResetPasswordSubmit = async (values: ResetPasswordFormDataType) => {
    return new Promise((resolve, reject) => {
      void (async () => {
        try {
          const response = await fetch("./api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({
              password: values.password,
              resetToken: searchParams.get("resetToken"),
              userId: searchParams.get("userId"),
            }),
          });
          if (response.status > 199 && response.status < 300) {
            router.push("/login");
            resolve("");
            return;
          }
          const result = await response.json();

          reject(new Error(result.error.code));
        } catch (e: any) {
          reject(new Error(e));
        }
      })();
    });
  };

  //ResetPassword end
  let props: any;
  switch (authTypeParam) {
    case "login":
      props = {
        router,
        allowTenantChange: false,
        formSchema: loginFormSchema,
        onSubmitFunction: signInServer,
        loginFunction: signInServer,
        passwordResetFunction: sendPasswordResetCodeServer,
        registerPath: "register",
      };
      break;
    case "register":
      props = {
        router,
        allowTenantChange: true,
        formSchema: registerFormSchema,
        registerFunction: signUpServer,
        loginPath: "login",
      };
      break;
    case "reset-password": {
      props = {
        onResetPasswordSubmit,
        onResetPasswordCancel: () => {
          router.push("/login");
        },
        passwordRequirements: {
          passwordRequiredLength: 5,
          passwordRequiredUniqueCharsLength: 3,
          passwordRequiresDigit: true,
          passwordRequiresLower: true,
          passwordRequiresNonAlphanumeric: true,
          passwordRequiresUniqueChars: true,
          passwordRequiresUpper: true,
        },
        error: errorMessage,
      };
      const verifyResetToken = async () => {
        await new Promise((resolve, reject) => {
          void (async () => {
            try {
              const response = await fetch("./api/post", {
                method: "POST",
                body: JSON.stringify({
                  body: {
                    resetToken: searchParams.get("resetToken"),
                    userId: searchParams.get("userId"),
                  },
                  url: "account/verify-password-reset-token",
                }),
              });
              if (response.status > 199 && response.status < 300) {
                const res = await response.json();
                if (!res) {
                  setErrorMessage(
                    resources.AbpIdentity?.texts?.[
                      "Volo.Abp.Identity:InvalidToken"
                    ],
                  );
                }
                resolve("");
              } else {
                const result = await response.json();
                setErrorMessage(result.error.code);
                reject(new Error(result.error.code));
              }
            } catch (e: any) {
              reject(new Error(e));
            }
          })();
        });
      };
      void verifyResetToken();
      break;
    }
  }

  return (
    <Auth
      authProps={props}
      authType={authTypeParam}
      cultureName={cultureName || "tr"}
      onLangChange={changeLocale}
      resources={resources}
    >
      <div className="bg-slate-100 flex flex-auto justify-center items-center">
        {appName === "UPWITHCROWD" ? (
          <div className="font-bold text-2xl md:text-5xl text-[#f15656]">
            UPWITHCROWD
          </div>
        ) : (
          <Logo textProps={{ className: "h-16" }} variant="text" />
        )}
      </div>
    </Auth>
  );
}
