"use client";
import { Inbox, InboxContent } from "@novu/react";
import { useRouter } from "next/navigation";
import { NotificationProps } from "./index";

export function NotificationInbox({
    appId,
    appUrl,
    subscriberId,
    langugageData,
    tabs,
    appearance,
    inboxContentProps,
}: NotificationProps) {
    const router = useRouter();

    if (!appId || !appUrl || !subscriberId) return null;
    const defaultAppearance: NotificationProps["appearance"] = {
        elements: {
            inboxContent: "w-full [&div]:w-full",
            inboxHeader: "px-4 py-2 border-b",
            inboxStatus__title: "text-sm font-medium text-gray-900",
            inboxStatus__dropdownContent: "rounded-none border border-l-0 mt-[2px]",
            inboxStatus__dropdownItem: "[&>.nv-inboxStatus__dropdownItemRight__icon]:text-primary",
            inboxStatus__dropdownItemLabelContainer: "has-[+span]:text-primary",
            inboxStatus__dropdownItemLabel: "text-sm font-medium",
            preferencesHeader: "p-0 py-1 px-4 border-b [&>*]:h-9",
            preferencesHeader__title: "text-sm font-medium text-gray-900 flex items-center",
            preferencesContainer: "[&+div.nt-flex]:hidden",
            notificationListContainer: "h-full [&+div.nt-flex]:hidden w-full",
            notificationList: "w-full",
            notification: "flex gap-2 px-3 py-2 md:px-6 md:py-4 w-full",
            tabsList: "p-0 gap-0  overflow-hidden w-full [&+div]:m-0 [&+div]:border-t-gray-200 [&+div]:z-0 group",
            tabsTrigger:
                "p-0 rounded-none px-4 h-9 data-[state=active]:bg-accent data-[state=active]:after:content-none data-[state=active]:text-primary",
            moreTabs__button:
                "p-0 border-l rounded-none px-2 after:content-none after:border-b-primary group-has-[button[data-state=active]]:text-muted-foreground group-has-[button[data-state=active]]:bg-white bg-accent text-primary",
            moreTabs__dropdownContent: "rounded-none border border-t-0 -mt-[9px]",
            moreTabs__dropdownItem: "has-[>svg]:bg-accent p-0 rounded-none h-9 px-2 text-sm",
            moreTabs__dropdownItemLabel: "has-[+svg]:text-primary [&+svg]:text-primary",
            moreActions__dropdownContent: "rounded-none border border-t-0 -mt-px",
            moreActions__dropdownItem: "text-sm",
            notificationsTabs__tabsRoot: "[&+div.nt-flex]:hidden",
            bellDot: "bg-primary",
            channelSwitchThumb: "peer-checked:bg-primary",
            button: "data-[variant=default]:bg-primary",
            notificationListNewNotificationsNotice__button: "bg-primary",
            notificationDot: "bg-primary",
            ...appearance?.elements,
        },
        animations: appearance?.animations,
        baseTheme: appearance?.baseTheme,
        variables: appearance?.variables,
    };
    return (
        <Inbox
            localization={langugageData}
            appearance={defaultAppearance}
            applicationIdentifier={appId}
            backendUrl={appUrl}
            routerPush={(path: string) => {
                router.push(path);
            }}
            tabs={tabs}
            subscriberId={subscriberId}>
            <InboxContent
                // onNotificationClick={(notification) => {
                //   // your logic to handle notification click
                //   toast.success(notification.subject || "");
                // }}
                // onPrimaryActionClick={(notification) => {
                //   toast.success(notification.subject || "");
                //   // your logic to handle primary action click
                // }}
                // onSecondaryActionClick={(notification) => {
                //   toast.success(notification.subject || "");
                //   // your logic to handle secondary action click
                // }}
                {...inboxContentProps}
            />
        </Inbox>
    );
}
