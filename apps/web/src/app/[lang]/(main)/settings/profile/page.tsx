"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { useUser } from "src/providers/user";

export default function Page() {
  const { user: userData } = useUser();
  const [userDataForm, setUserDataForm] = useState(userData);

  function onSaveClick() {
    if (JSON.stringify(userDataForm) === JSON.stringify(userData)) {
      // no changes
      return;
    }
    fetch("/api/settings/profile", {
      method: "PUT",
      body: JSON.stringify({
        userName: "eren1",
        email: "asd@asd.com",
        name: "erennnn",
      }),
      redirect: "follow",
    });
  }
  return (
    <div>
      <div className="grid w-full items-center gap-3 mt-2">
        <div className="flex-row flex items-center justify-center">
          <div className="rounded-full w-20 h-20 relative">
            <img
              src="https://github.com/shadcn.png"
              className="rounded-full border-4 border-gray-200 w-full h-full"
            />
            <div className="absolute top-0 -right-4 p-1.5 w-8 h-8 bg-white rounded-full border border-gray-400">
              <Label htmlFor="picture">
                <EditIcon className="w-full h-full cursor-pointer" />
              </Label>
            </div>
          </div>
          <Input
            id="picture"
            placeholder="John"
            type="file"
            className="hidden"
          />
        </div>
      </div>
      <div className="grid w-full items-center gap-3 mt-4">
        <Label htmlFor="picture">Kullanıcı adı</Label>
        <Input
          id="picture"
          value={userDataForm?.userName || ""}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, userName: e.target.value })
          }
        />
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
      </div>
      <div className="grid w-full items-center gap-3 mt-4">
        {/* <Separator /> */}
      </div>
      <div className="w-full flex-row flex items-end gap-3 mt-4 justify-end">
        <Button variant={"outline"}>İptal</Button>
        <Button onClick={onSaveClick}>Güncelle</Button>
      </div>
    </div>
  );
}
