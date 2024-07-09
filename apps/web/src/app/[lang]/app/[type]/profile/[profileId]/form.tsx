"use client";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import { postBacker, postIndividual, putBacker } from "../actions";
import { formSchema } from "../data";

export function BackerForm({
  type,
  backer,
  profileId,
}: {
  type: string;
  backer: any;
  profileId: string;
}) {
  const [formType, setFormType] = useState<string>(type);
  const [data, setData] = useState<any>();
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
  function submitFormData(formData) {
    if (profileId === "new") {
      functionTypes[formType].post(formData);
    } else {
      functionTypes[formType].put(profileId, formData);
    }
  }
  return (
    <>
      <div className="flex flex-row justify-end">
        <Button
          className="w-48 flex float-right"
          onClick={() => {
            if (formType === "individual") {
              setFormType("investor");
            } else {
              setFormType("individual");
            }
          }}
        >
          {" "}
          Change to {formType === "individual" ? "investor" : "individual"}{" "}
          profile
        </Button>
      </div>
      <div className="grid gap-4 py-4">
        <ScrollArea className="max-h-[600px]">
          <ScrollBar forceMount />
          <AutoForm
            // id="backer-form-new"
            formSchema={formSchema[formType]}
            onParsedValuesChange={(values) => {
              setData(values);
            }}
            onSubmit={(formData) => {
              submitFormData(formData);
            }}
            values={backer}
          >
            <AutoFormSubmit>
              <>Add {formType}</>
            </AutoFormSubmit>
          </AutoForm>
        </ScrollArea>
      </div>
      <div className="flex-row mb-2">
        {/* <Button className="max-w-20 float-right" onClick={() => submitFormData(data)}>
          Save Form
        </Button> */}
      </div>
    </>
  );
}
