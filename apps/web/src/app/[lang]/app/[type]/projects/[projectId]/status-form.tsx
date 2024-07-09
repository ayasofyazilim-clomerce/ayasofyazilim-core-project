"use client";
import { toast } from "@/components/ui/sonner";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import { updateProjectStatusServer } from "../action";

export interface IStatusFormProps {
  projectId: string;
  actionText: string;
}
export default function StatusForm({
  projectId,
  actionText,
}: IStatusFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSendToApprovalClick() {
    setIsLoading(true);
    try {
      const result = await updateProjectStatusServer(
        projectId,
        ProjectStatusEnums.SENT_FOR_APPROVAL,
      );

      if (result.status === 200) {
        toast.success("Başarılı.");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CustomButton
      className="w-full bg-transparent text-primary mt-3 border-primary border hover:bg-primary hover:text-white"
      disabled={isLoading}
      onClick={onSendToApprovalClick}
      variant="default"
    >
      {actionText}
    </CustomButton>
  );
}
