'use client';
import {
    SquareStack,
    User,
} from 'lucide-react';

import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import Mainlayout, { mainLayoutProps } from "@repo/ayasofyazilim-ui/templates/mainlayout";
import "./../../globals.css";

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

export default async function Layout({ children }: LayoutProps) {
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
    return (
        <Mainlayout logo="https://github.com/ayasofyazilim-clomerce.png" title="ayaasofya" menus={exampleMenus}>
            <>
                {children}
            </>
        </Mainlayout>
    );
}
