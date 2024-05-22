"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import { Volo_Abp_Account_ProfileDto } from "@ayasofyazilim/saas/AccountService";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "src/providers/user";
import { getBaseLink } from "src/utils";

export default function Page() {
  const { user: userData } = useUser();
  const [userDataForm, setUserDataForm] = useState<
    Volo_Abp_Account_ProfileDto | undefined
  >();

  useEffect(() => {
    if (userData) {
      setUserDataForm(userData);
    }
  }, [userData]);

  function onSaveClick() {
    if (JSON.stringify(userDataForm) === JSON.stringify(userData)) {
      // no changes
      return;
    }
    fetch(getBaseLink("api/settings/profile", false), {
      method: "PUT",
      body: JSON.stringify({
        userName: "eren1",
        email: "asd@asd.com",
        name: "erennnn",
      }),
    });
  }

  if (!userDataForm) {
    return (
      <div className="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-around md:justify-center">
        <Spinner
          variant="transparent"
          fullScreen={false}
          size="md"
          className="stroke-purple-900"
        />
      </div>
    );
  }
  return (
    <>
      <div className="basis-2/4">
        <div className="grid w-full items-center gap-3 mt-4">
          <Label htmlFor="picture">Kullanıcı adı</Label>
          <Input
            id="picture"
            value={userDataForm?.userName || ""}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, userName: e.target.value })
            }
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Hesabınıza giriş yaparken kullanacağınız benzersiz kullanıcı adınız.
          </p>
        </div>
        <div className="grid w-full items-center gap-3 mt-4">
          <Label htmlFor="picture">Ad</Label>
          <Input
            id="picture"
            value={userDataForm?.name || ""}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, name: e.target.value })
            }
          />
          <p className="text-[0.8rem] text-muted-foreground">Gerçek adınız.</p>
        </div>
        <div className="grid w-full items-center gap-3 mt-4">
          <Label htmlFor="picture">Soyad</Label>
          <Input
            id="picture"
            value={userDataForm?.surname || ""}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, surname: e.target.value })
            }
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Gerçek soyadınız.
          </p>
        </div>
        <div className="grid w-full items-center gap-3 mt-4">
          <Label htmlFor="picture">Email</Label>
          <Input
            id="picture"
            value={userDataForm?.email || ""}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, email: e.target.value })
            }
            disabled
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Bu email adresiniz hesabınıza giriş yaparken ve şifre sıfırlamak
            istediğinizde kullanılacaktır.
          </p>
        </div>

        <div className="grid w-full items-center gap-3 mt-4">
          <Label htmlFor="picture">Telefon</Label>
          <Input
            id="picture"
            value={userDataForm?.phoneNumber || ""}
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, phoneNumber: e.target.value })
            }
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Telefon numaranız.
          </p>
        </div>
        <div className="grid w-full items-center gap-3 mt-4">
          {/* <Separator /> */}
        </div>
        <div className="w-full flex-row flex items-end gap-3 mt-4 justify-end">
          <Button variant={"outline"}>İptal</Button>
          <Button onClick={onSaveClick}>Güncelle</Button>
        </div>
      </div>
      <div className="basis-1/4 min-w-[100px]">
        <div className="rounded-full relative max-w-[250px] m-auto">
          <img
            src="https://github.com/shadcn.png"
            className="rounded-full border-4 border-gray-200 w-full h-full"
          />
          <div className="absolute top-0 right-0 p-1.5 w-8 h-8 bg-white rounded-full border border-gray-400">
            <Label htmlFor="picture">
              <EditIcon className="w-full h-full cursor-pointer" />
            </Label>
          </div>
        </div>
        <Input id="picture" placeholder="John" type="file" className="hidden" />
      </div>
    </>
  );
}
