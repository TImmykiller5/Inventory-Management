import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 



export async function GET(
    request: Request,
    { params }: { params: { storeID: string; purchaseID: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeID, purchaseID } = params;
    const purchase = await prismadb.purchase.findUnique({
        where: {
            id: purchaseID,
            storeId: storeID,
        },
        include: {
            product: true,
        },
    });
    return NextResponse.json(purchase, { status: 200 });
}

export async function DELETE (
    request: Request,
    { params }: { params: { storeID: string; purchaseID: string } }
) { 
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeID, purchaseID } = params;
    const purchase = await prismadb.purchase.findUnique({
        where: {
            id: purchaseID,
            storeId: storeID,
            userId: session.user.id
        },
    })

    if (!purchase) {
        return new NextResponse("Purchase not found", { status: 404 });
    }


    const deletedPurchase = await prismadb.$transaction(async (prisma) => {
        const purchase = await prisma.purchase.delete({
            where: {
                id: purchaseID,
                storeId: storeID,
                userId: session.user.id
            },
        })
        const product = await prisma.product.update({
            where: {
                id: purchase.productId
            },
            data: {
                stock: {
                    decrement: purchase.quantity
                }
            }
        })

        if(product.stock < 0) {
            throw new Error("Product out of stock");
        }

        return purchase
    })

    // const purchase = await prismadb.purchase.delete({
    //     where: {
    //         id: purchaseID,
    //         storeId: storeID,
    //         userId: session.user.id
    //     },
    // });
    return NextResponse.json({purchase, message:"Purchase deleted successfully", status: 200 }, { status: 200 });
}