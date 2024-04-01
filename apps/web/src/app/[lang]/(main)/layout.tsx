'use client';
import {
    SquareStack,
    User,
} from 'lucide-react';

import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react";
import Mainlayout, { mainLayoutProps } from "@repo/ayasofyazilim-ui/templates/mainlayout";
import "./../../globals.css";
import { Volo_Abp_Account_ProfileDto } from 'ayasofyazilim-saas';

type LayoutProps = {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
}

type MenuProps = {
    href: string;
    icon: ReactNode;
    label: string;
    name: string;
    submenu?: Submenu[];
};

type Submenu = {
    href: string;
    icon: ReactNode;
    name: string;
};

export default function Layout({ children }: LayoutProps) {
    const exampleMenus: MenuProps[] = [
        {
            label: 'Pages',
            name: 'Profile',
            icon: <User size={15} className="mr-2" />,
            href: 'profile',
        },
        {
            label: 'Pages',
            name: 'Dashboard',
            icon: <SquareStack size={15} className="mr-2" />,
            href: 'dashboard',
        },
    ];
    let [user, setUser] = useState<Volo_Abp_Account_ProfileDto | null>({});
    // use effect to fetch the user from the server 
    useEffect(() => {
        async function getUser() {
            let fetchedUser = await fetch('api/profile/myprofile');
            let userData = await fetchedUser.json() as Volo_Abp_Account_ProfileDto;
            console.log(userData);
            setUser(userData);
        }
        getUser();
    }, []);
    const userNavigation = {
        username: user?.name,
        initials: user?.name?.substring(0, 2).toUpperCase(),
        email: user?.email,
        imageURL: "https://github.com/a0m0rajab.png"
    }
    return (
        <Mainlayout
            logo="https://github.com/ayasofyazilim-clomerce.png"
            title="ayaasofya"
            menus={exampleMenus}
            userNav={userNavigation}
        >
            <>
                {children}
            </>
        </Mainlayout >
    );
}
