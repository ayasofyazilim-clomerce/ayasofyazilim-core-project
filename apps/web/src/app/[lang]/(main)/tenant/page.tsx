"use client";
import Dashboard from '@repo/ayasofyazilim-ui/templates/dashboard';
import { $Volo_Saas_Host_Dtos_SaasTenantDto as tableType } from "@ayasofyazilim/saas/SaasService";
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { getBaseLink } from 'src/utils';

export default function Page(): JSX.Element {
    const [roles, setRoles] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const activationStateMap = {
        "Active": 0,
        "Active with limited time": 1,
        "Passive": 2
    };

    const activationStateReverseMap = {
        0: "Active",
        1: "Active with limited time",
        2: "Passive"
    };

    function getRoles() {
        const baseLink = getBaseLink("/api/tenant");
        fetch(baseLink)
            .then((res) => res.json())
            .then((data) => {
                const transformedData = data.items.map((item: any) => ({
                    ...item,
                    activationState: activationStateReverseMap[item.activationState]
                }));
                setRoles({ ...data, items: transformedData });
                setIsLoading(false);
            });
    }

    const formSchema = z.object({
        name: z.string().max(64).min(0),
        editionId: z.string().uuid().nullable().optional(),
        adminEmailAddress: z.string().email().max(256).min(0),
        adminPassword: z.string().max(128).min(0),
        activationState: z.enum(['Active', 'Active with limited time', 'Passive']),
    });

    const editformSchema = z.object({
        name: z.string().max(64).min(0),
        editionId: z.string().uuid().nullable().optional(),
        activationState: z.enum(['Active', 'Active with limited time', 'Passive']),
    });

    const autoFormArgs = { formSchema };
    const editautoFormArgs = { formSchema: editformSchema };

    const action = {
        cta: "New tenant",
        description: "Create a new role for users",
        autoFormArgs,
        callback: (e) => {
            const transformedData = {
                ...e,
                activationState: activationStateMap[e.activationState]
            };
            fetch(getBaseLink("/api/tenant"), {
                method: 'POST',
                body: JSON.stringify(transformedData)
            })
            .then(response => response.json())
            .then(() => getRoles())
            .catch((error) => {
                console.error('Error creating role:', error);
            });
        }
    };

    const tableHeaders = [
        { name: "name", isSortable: true },
        { name: "isDefault" },
        { name: "isPublic" },
        { name: "userCount" }
    ];

    useEffect(() => {
        setIsLoading(true);
        getRoles();
    }, []);

    const rolesCards = roles?.items.slice(-4).map((item: any) => ({
        title: item.name,
        content: item.userCount,
        description: "Users",
        footer: item.isPublic ? "Public" : "Not Public",
    }));

    const excludeList = ['id', 'extraProperties', 'concurrencyStamp'];

    const onEdit = (data: any, row: any) => {
        const transformedData = {
            ...data,
            activationState: activationStateMap[data.activationState]
        };
        fetch(getBaseLink("/api/tenant"), {
            method: 'PUT',
            body: JSON.stringify({
                id: row.id,
                requestBody: JSON.stringify(transformedData)
            })
        })
        .then(response => response.json())
        .then(() => getRoles())
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const onDelete = (e: any, row: any) => {
        fetch(getBaseLink("/api/tenant"), {
            method: 'DELETE',
            body: JSON.stringify(row.id)
        })
        .then(response => response.json())
        .then(() => getRoles())
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const columnsData = {
        type: "Auto",
        data: { getRoles, autoFormArgs: editautoFormArgs, tableType, excludeList, onEdit, onDelete }
    };

    return (
        <Dashboard
            action={action}
            cards={rolesCards}
            columnsData={columnsData}
            data={roles?.items}
            filterBy="name"
            isLoading={isLoading}
            withCards={false}
            withTable
        />
    );
}
