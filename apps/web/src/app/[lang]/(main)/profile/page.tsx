'use client';

import { Volo_Abp_Account_ProfileDto } from "ayasofyazilim-saas";
import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
    let [user, setUser] = useState<Volo_Abp_Account_ProfileDto | null>({});
    async function getUser() {
        let fetchedUser = await fetch('api/profile/myprofile');
        let userData = await fetchedUser.json() as Volo_Abp_Account_ProfileDto;
        console.log(userData);
        setUser(userData);
    }
    // use effect to fetch the user from the server 
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="bg-zinc-800 flex flex-auto flex-col justify-center items-start h-100 text-white text-xl">
            <h1 className="text-2xl">Selamun aleyküm!</h1>
            <br />
            {user && Object.keys(user).map((key) => {
                if (key === 'extraProperties') return;
                return (
                    <div>{key}:{user[key]}</div>
                );
            })}
        </div>
    );
}
