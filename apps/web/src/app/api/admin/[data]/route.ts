import { Volo_Abp_Identity_IdentityRoleCreateDto, Volo_Abp_Identity_IdentityRoleUpdateDto } from "@ayasofyazilim/saas/IdentityService";
import { NextRequest } from "next/server";
import { getIdentityServiceClient } from "src/lib";

type Clients = {
    [key: string]: any;
};

const errorResponse = (message: string) => new Response(JSON.stringify({ message }), { status: 400 });

const clients: Clients = {
    role: async (req: NextRequest) => {
        const client = await getIdentityServiceClient(req);
        const role = client.role;
        return {
            get: async () => role.getApiIdentityRolesAll(),
            post: async (requestBody: Volo_Abp_Identity_IdentityRoleCreateDto) => role.postApiIdentityRoles({ requestBody }),
            put: async ({ id, requestBody }: { id: string, requestBody: Volo_Abp_Identity_IdentityRoleUpdateDto }) => role.putApiIdentityRolesById({ id, requestBody }),
            delete: async (id: string) => role.deleteApiIdentityRolesById({ id })
        }
    },
    user: async (req: NextRequest) => {
        const client = await getIdentityServiceClient(req);
        const user = client.user;
        return {
            get: async () => user.getApiIdentityUsers(),
            post: async (requestBody: any) => user.postApiIdentityUsers({ requestBody }),
            put: async ({ id, requestBody }: { id: string, requestBody: any }) => user.putApiIdentityUsersById({ id, requestBody }),
            delete: async (id: string) => user.deleteApiIdentityUsersById({ id })
        }
    }
}

export async function GET(request: NextRequest, { params }: { params: { data: string }   }) {
    if(!clients[params.data]){
        // return status 404
        return errorResponse("Invalid data type");
    }
    const client = await clients[params.data](request);
    const data = await client.get();
    return new Response(JSON.stringify(data));
}

export async function POST(request: NextRequest, { params }: { params: { data: string }   }) {
    if(!clients[params.data]){
        return errorResponse("Invalid data type");
    }
    const client = await clients[params.data](request);
    const requestBody = await request.json();
    const roles = await client.post(requestBody)

    return new Response(JSON.stringify(roles));
}


export async function DELETE(request: NextRequest, { params }: { params: { data: string }   }) {
    if(!clients[params.data]){
        return errorResponse("Invalid data type");
    }
    let retVal = "something went wrong";
    const client = await clients[params.data](request);
    const id = await request.json();
    const deleteById = await client.delete(id)
    if (deleteById === undefined) retVal = "successfull"

    return new Response(JSON.stringify(retVal));
}

export async function PUT(request: NextRequest, { params }: { params: { data: string }   }) {
    if(!clients[params.data]){
        return errorResponse("Invalid data type");
    }
    const client = await clients[params.data](request);
    const requestBody = await request.json();
    const roles = await client.put({
        id: requestBody.id,
        requestBody: JSON.parse(requestBody.requestBody)
    });

    return new Response(JSON.stringify(roles));
}