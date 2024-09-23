import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 




export async function GET(request: Request, { params }: { params: { storeID: string } }) {
    try {
        
        const { storeID } = params
        console.log(storeID)
        const store = await prismadb.store.findUnique({
            where: {
                id: storeID
            }
        })
        return NextResponse.json(store, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH(request: Request, { params }: { params: { storeID: string } }) {
    const session = await getServerSession(authOptions)
    console.log(params)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeID } = params
    console.log(storeID)
    try {
        const body = await request.json();
        const store = await prismadb.store.update({
            where: {
                id: storeID,
                ownerId: session.user.id
            },
            data: {
                name: body.name,
                location: body.location
            }
        })
        return NextResponse.json({ store , message:"Store updated successfully"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { storeID: string } }) {
    const session = await getServerSession(authOptions)
    console.log(params)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeID } = params
    console.log(storeID)
    try {
        
        const store = await prismadb.store.delete({
            where: {
                id: storeID,
                ownerId: session.user.id
            }
        })
        return NextResponse.json({ store , message:"Store deleted successfully"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}