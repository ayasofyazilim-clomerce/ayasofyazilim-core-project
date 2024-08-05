"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirmation-modal";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  deleteBacker,
  postBacker,
  postIndividual,
  putBacker,
} from "../actions";
import { formSchema } from "../data";

function initBackerData(backer: any) {
  const data = {
    address: backer.address,
    generalInformation: {
      name: backer.name,
      companyName: backer.companyName,
      taxpayerId: backer.taxpayerId,
      legalStatusCode: backer.legalStatusCode,
      customerNumber: backer.customerNumber,
      emailAddress: backer.emailAddress,
      phoneNumber: backer?.telephone?.localNumber
        ? `+${backer?.telephone?.areaCode}${backer?.telephone?.localNumber}`
        : "+90",
    },
  };
  return data;
}
export function BackerForm({
  formType,
  backer,
  profileId,
}: {
  formType: string;
  backer: any;
  profileId: string;
}) {
  const [isCreated, setIsCreated] = useState(false);
  const backerData = initBackerData(backer);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();
  const [confirmDialogContent, setConfirmDialogContent] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    title: "",
    description: "",
    onConfirm: () => undefined,
  });
  const functionTypes: Record<string, any> = {
    individual: {
      post: postIndividual,
      put: putBacker,
    },
    organization: {
      post: postBacker,
      put: putBacker,
    },
  };

  const isPhoneValid = (phone: string) => {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  async function submitFormData(formData: any) {
    const isValid = isPhoneValid(formData.generalInformation.phoneNumber);
    if (!isValid) {
      return;
    }
    //PUT servisi henüz hazır değil
    const submitData = {
      name:
        formData.generalInformation.name ||
        formData.generalInformation.companyName,
      emailAddress: formData.generalInformation.emailAddress,
      taxpayerId: formData.generalInformation.taxpayerId,
      legalStatusCode: formData.generalInformation.legalStatusCode,
      customerNumber: formData.generalInformation.customerNumber,

      telephone: [
        {
          areaCode: formData.generalInformation.phoneNumber
            .split("+")[1]
            .substring(0, 3),
          localNumber: formData.generalInformation.phoneNumber
            .split("+")[1]
            .substring(3),
          ITUCountryCode: "1",
        },
      ],
      address: formData.address,
    };
    if (profileId === "new-organization" || profileId === "new-individual") {
      const result = await functionTypes[formType].post(submitData);
      if (result.id) {
        toast.success("Profil oluşturuldu.");
        setIsCreated(true);
        router.back();
      } else {
        toast.error("Bir hata oluştu.");
      }
    } else {
      functionTypes[formType].put(profileId, submitData);
    }
  }
  function handleDeleteBacker(_backer: any) {
    setConfirmDialogContent({
      title: "Profili Sil",
      description: `"${_backer.name}" isimli profili silmek istediğinize emin misiniz?`,
      onConfirm: () => {
        deleteBacker(profileId)
          .then(() => {
            router.back();
            toast.success("Profil silindi.");
          })
          .catch(() => {
            toast.error("Bir hata oluştu.");
          });
        setIsConfirmDialogOpen(false);
      },
    });
    setIsConfirmDialogOpen(true);
  }
  return (
    <>
      <div className="flex justify-end flex-row mb-2">
        {profileId !== "new-organization" && profileId !== "new-individual" && (
          <Button
            onClick={() => {
              handleDeleteBacker(backer);
            }}
            variant="outline"
          >
            Profili Sil
          </Button>
        )}
      </div>
      <AutoForm
        className="pb-10"
        fieldConfig={{
          generalInformation: {
            phoneNumber: {
              fieldType: "phone",
              inputProps: {
                showLabel: true,
              },
            },
          },
        }}
        formSchema={formSchema[formType]}
        onSubmit={(formData) => {
          void submitFormData(formData);
        }}
        showInRow
        values={backerData}
      >
        {isCreated ||
        (profileId !== "new-organization" && profileId !== "new-individual") ? (
          <></>
        ) : (
          <AutoFormSubmit>
            <>Kaydet</>
          </AutoFormSubmit>
        )}
      </AutoForm>

      <ConfirmDialog
        description={confirmDialogContent.description}
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
        }}
        onConfirm={confirmDialogContent.onConfirm}
        title={confirmDialogContent.title}
      />
    </>
  );
}
