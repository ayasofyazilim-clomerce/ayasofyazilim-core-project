"use client";
import { ResetPasswordFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/reset-password-form";
import { Auth, authTypes, isAuthType } from "@repo/ayasofyazilim-ui/pages/auth";
import {
  sendPasswordResetCodeServer,
  signInServer,
  signUpServer,
} from "auth-action";
import Error from "next/error";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLocale } from "src/providers/locale";
import { z } from "zod";
import "../../globals.css";

export default function Page(): JSX.Element {
  const { cultureName, resources, changeLocale } = useLocale();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  let authTypeParam = params.auth as authTypes;
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  if (!isAuthType(authTypeParam)) {
    return (
      <Error statusCode={404} title={resources?.AbpUi.texts?.PageNotFound} />
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
  const onResetPasswordSubmit = (
    values: ResetPasswordFormDataType
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
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
          return resolve("");
        } else {
          let result = await response.json();
          return reject(result.error.code);
        }
      } catch (e) {
        return reject(e);
      }
    });
  };

  //ResetPassword end
  let props = {};
  if (authTypeParam === "login") {
    props = {
      router: router,
      allowTenantChange: false,
      formSchema: loginFormSchema,
      onSubmitFunction: signInServer,
      loginFunction: signInServer,
      passwordResetFunction: sendPasswordResetCodeServer,
      registerPath: "register",
    };
  } else if (authTypeParam === "register") {
    props = {
      router: router,
      allowTenantChange: true,
      formSchema: registerFormSchema,
      registerFunction: signUpServer,
      loginPath: "login",
    };
  } else if (authTypeParam === "reset-password") {
    props = {
      onResetPasswordSubmit: onResetPasswordSubmit,
      onResetPasswordCancel: () => {
        router.push("/login");
      },
      passwordRequirements: {
        passwordRequiredLength: 5,
        passwordRequiredUniqueCharsLength: 3,
        passwordRequiresDigit: 1,
        passwordRequiresLower: 1,
        passwordRequiresNonAlphanumeric: true,
        passwordRequiresUniqueChars: true,
        passwordRequiresUpper: true,
      },
      error: errorMessage,
    };
    const verifyResetToken = async () => {
      await new Promise(async (resolve, reject) => {
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
            let res = await response.json();
            if (!res) {
              setErrorMessage(
                resources?.AbpIdentity?.texts?.[
                  "Volo.Abp.Identity:InvalidToken"
                ]
              );
            }
            return resolve("");
          } else {
            let result = await response.json();
            setErrorMessage(result.error.code);
            return reject(result.error.code);
          }
        } catch (e) {
          return reject(e);
        }
      });
    };
    verifyResetToken();
  }

  return (
    <Auth
      authType={authTypeParam}
      // @ts-ignore
      authProps={props}
      resources={resources ? JSON.parse(JSON.stringify(resources)) : undefined}
      cultureName={cultureName || "tr"}
      onLangChange={changeLocale}
    >
      <div className="bg-zinc-800 flex flex-auto justify-center items-center">
        <div>
          <span className="tracking-widest text-2xl font-bold text-white">
            UPWITHCROWD
          </span>
        </div>
      </div>
    </Auth>
  );
}
