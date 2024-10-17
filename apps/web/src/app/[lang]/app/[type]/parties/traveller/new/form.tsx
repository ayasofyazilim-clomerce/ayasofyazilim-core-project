"use client";

import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_LocationService_Cities_CityDto,
  UniRefund_LocationService_Countries_CountryDto,
} from "@ayasofyazilim/saas/LocationService";
import type { UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto as travellerCreateDTOType } from "@ayasofyazilim/saas/TravellerService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { AutoFormInputComponentProps } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import AutoForm, {
  AutoFormSubmit,
  createFieldConfigWithResource,
  CustomCombobox,
  mergeFieldConfigs,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { createTravellerWithComponents } from "../actions";
import type { CreateTravellerDTO } from "../data";
import {
  createTravellerSchema,
  formPositions,
  formSubPositions,
} from "../data";
import {
  getCities,
  getCountries,
} from "../../../../actions/LocationService/actions";

export default function Form({
  languageData,
}: {
  languageData: TravellerServiceResource;
}) {
  const router = useRouter();
  const [cities, setCities] = useState<
    UniRefund_LocationService_Cities_CityDto[]
  >([]);
  const [countries, setCountries] = useState<
    UniRefund_LocationService_Countries_CountryDto[]
  >([]);

  const getCity = async () => {
    try {
      const response = await getCities({ maxResultCount: 1000 });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message);
      } else {
        setCities(response.data.items || []);
      }
    } catch (error) {
      toast.error(languageData["Fetch.Fail.City"]);
    }
  };

  const getCountry = async () => {
    try {
      const response = await getCountries({ maxResultCount: 1000 });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message);
      } else {
        setCountries(response.data.items || []);
      }
    } catch (error) {
      toast.error(languageData["Fetch.Fail.Country"]);
    }
  };

  useEffect(() => {
    void getCity();
    void getCountry();
  }, []);

  const SaveTraveller = async (formData: CreateTravellerDTO) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData: travellerCreateDTOType = {
      entityInformationTypes: [
        {
          individuals: [
            {
              name: {
                ...formData.name,
              },
              personalSummaries: [
                {
                  ...formData.personalSummaries,
                },
              ],
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [
                    {
                      ...formData.address,
                      primaryFlag: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      personalIdentificationCommonDatas: [
        {
          ...formData.personalIdentificationCommonDatas,
        },
      ],
      personalPreferencesTypes: [
        {
          ...formData.personalPreferencesTypes,
        },
      ],
    };
    try {
      const response = await createTravellerWithComponents({
        requestBody: createformData,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message || languageData["Travellers.New.Error"]);
      } else {
        toast.success(languageData["Travellers.New.Succes"]);
        router.push(getBaseLink(`/app/admin/parties/traveller`));
      }
    } catch (error) {
      toast.error(languageData["Travellers.Fail"]);
    }
  };

  const translatedForm = createFieldConfigWithResource({
    schema: createTravellerSchema,
    resources: languageData,
  });

  const countryEnum = {
    renderer: (props: AutoFormInputComponentProps) => (
      <CustomCombobox<UniRefund_LocationService_Countries_CountryDto>
        childrenProps={props}
        emptyValue={languageData["Country.Select"]}
        list={countries}
        selectIdentifier="code2"
        selectLabel="name"
      />
    ),
  };

  return (
    <AutoForm
      className=" grid gap-2 space-y-0 md:grid-cols-2 lg:grid-cols-3"
      fieldConfig={mergeFieldConfigs(translatedForm, {
        telephone: {
          localNumber: {
            fieldType: "phone",
            inputProps: {
              showLabel: true,
            },
          },
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        address: {
          className: "row-span-2",
          city: {
            renderer: (props: AutoFormInputComponentProps) => (
              <CustomCombobox<UniRefund_LocationService_Cities_CityDto>
                childrenProps={props}
                emptyValue={languageData["City.Select"]}
                list={cities}
                selectIdentifier="id"
                selectLabel="name"
              />
            ),
          },
          country: {
            renderer: (props: AutoFormInputComponentProps) => (
              <CustomCombobox<UniRefund_LocationService_Countries_CountryDto>
                childrenProps={props}
                emptyValue={languageData["Country.Select"]}
                list={countries}
                selectIdentifier="id"
                selectLabel="name"
              />
            ),
          },
        },
        personalIdentificationCommonDatas: {
          className: "row-span-2",
          residenceCountryCode2: countryEnum,
          nationalityCountryCode2: countryEnum,
        },
      })}
      formSchema={createZodObject(
        createTravellerSchema,
        formPositions,
        undefined,
        formSubPositions,
      )}
      onSubmit={(val) => {
        void SaveTraveller(val as CreateTravellerDTO);
      }}
      stickyChildren
    >
      <AutoFormSubmit className="float-right py-4">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
