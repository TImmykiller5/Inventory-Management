import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 


export async function GET(request: Request, { params }: { params: { productID: string } }) {

    const { productID } = params
    const product = await prismadb.product.findUnique({
        where: {
            id: productID
        },
        include: {
            category: true
        }
    })
    return NextResponse.json(product, { status: 200 })
}

export async function PATCH(request: Request, { params }: { params: { productID: string } }) {
    const session = await getServerSession(authOptions)
    console.log(params)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productID } = params
    console.log(productID)
    try {
        const body = await request.json();
        const product = await prismadb.product.update({
            where: {
                id: productID,
                ownerId: session.user.id
            },
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                image: body.image,
                categoryId: body.categoryId
            }
        })
        return NextResponse.json({ product , message:"Product updated successfully"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { productID: string } }) {
    const session = await getServerSession(authOptions)
    console.log(params)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productID } = params
    console.log(productID)
    try {
        
        const product = await prismadb.product.delete({
            where: {
                id: productID,
                ownerId: session.user.id
            }
        })
        return NextResponse.json({ product , message:"Product deleted successfully"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}