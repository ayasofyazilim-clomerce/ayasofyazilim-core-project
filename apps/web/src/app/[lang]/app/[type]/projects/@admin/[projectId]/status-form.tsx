"use client";
import { toast } from "@/components/ui/sonner";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import { updateProjectStatusServer } from "../../action";

export interface StatusFormProps {
  projectId: string;
  actionText: string;
}
export default function StatusForm({ projectId, actionText }: StatusFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  function onSendToApprovalClick() {
    setIsLoading(true);
    try {
      void updateProjectStatusServer(
        projectId,
        ProjectStatusEnums.SENT_FOR_APPROVAL,
      ).then((response) => {
        if (response.status === 200) {
          toast.success("Başarılı.");
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      toast.error(error.message);
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
