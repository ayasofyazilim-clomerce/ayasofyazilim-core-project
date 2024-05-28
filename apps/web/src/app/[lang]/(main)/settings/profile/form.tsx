"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import {
  $Volo_Abp_Account_UpdateProfileDto,
  Volo_Abp_Account_ProfileDto,
} from "@ayasofyazilim/saas/AccountService";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { updateUserProfileServer } from "action";
import { EditIcon } from "lucide-react";
import { ZodObjectOrWrapped } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/utils";
import { useEffect, useState } from "react";
import { createZodObject } from "src/utils";

const inputs: (keyof Volo_Abp_Account_ProfileDto)[] = [
  "userName",
  "email",
  "name",
  "surname",
  "phoneNumber",
];
const form = $Volo_Abp_Account_UpdateProfileDto;
const formSchema = createZodObject(form, inputs) as ZodObjectOrWrapped;

export default function ProfileForm({
  user,
}: {
  user: Volo_Abp_Account_ProfileDto | undefined;
}) {
  const [userDataForm, setUserDataForm] = useState<
    Volo_Abp_Account_ProfileDto | undefined
  >(user);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const formChanged = inputs.some((i) => userDataForm?.[i] !== user?.[i]);
    setIsSubmitDisabled(!(formChanged || imageFile !== null));
  }, [userDataForm, imageFile]);

  async function onSubmit() {
    if (isSubmitDisabled) {
      return;
    }
    setIsLoading(true);

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("ImageContent", imageFile);
        formData.append("type", "2");

        const response = await fetch("/api/profile/myprofile", {
          method: "POST",
          body: formData,
        });
      }

      const profileResponse = await updateUserProfileServer(
        userDataForm as any
      );
      if (profileResponse.status === 200) {
        toast.success("Başarılı.");
        setIsSubmitDisabled(true);
        setImageFile(null); // Reset the imageFile state
      } else {
        toast.error(profileResponse?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  }

  return (
    <>
      <div className="basis-2/4 pt-4">
        <AutoForm
          formSchema={formSchema}
          onParsedValuesChange={(i) => setUserDataForm(i)}
          values={user}
          onSubmit={onSubmit}
        >
          <Button
            disabled={isSubmitDisabled}
            isLoading={isLoading}
            className=" w-[120px] text-white float-right"
          >
            Güncelle
          </Button>
        </AutoForm>
      </div>
      <div className="basis-1/4 min-w-[100px] pt-4">
        <div className="relative m-auto w-64 h-64">
          <img
            src={selectedImage}
            className="rounded-full border-4 border-gray-200 w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 p-1.5 w-8 h-8 bg-white rounded-full border border-gray-400">
            <Label htmlFor="picture">
              <EditIcon className="w-full h-full cursor-pointer" />
            </Label>
          </div>
        </div>
        <Input
          id="picture"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
}
