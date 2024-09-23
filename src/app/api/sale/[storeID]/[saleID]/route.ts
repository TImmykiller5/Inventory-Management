import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 



export async function GET(
    request: Request,
    { params }: { params: { storeID: string; saleID: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeID, saleID } = params;
    const sale = await prismadb.sale.findUnique({
        where: {
            id: saleID,
            storeId: storeID,
        },
        include: {
            product: true,
        },
    });
    return NextResponse.json(sale, { status: 200 });
}

export async function DELETE (
    request: Request,
    { params }: { params: { storeID: string; saleID: string } }
) { 
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeID, saleID } = params;
    const sale = await prismadb.sale.findUnique({
        where: {
            id: saleID,
            storeId: storeID,
            userId: session.user.id
        },
    })

    if (!sale) {
        return new NextResponse("Sale not found", { status: 404 });
    }


    const deletedSale = await prismadb.$transaction(async (prisma) => {
        const sale = await prisma.sale.delete({
            where: {
                id: saleID,
                storeId: storeID,
                userId: session.user.id
            },
        })
        const product = await prisma.product.update({
            where: {
                id: sale.productId
            },
            data: {
                stock: {
                    increment: sale.quantity
                },
                totalSale: {
                    decrement: sale.quantity,
                }
            }
        })
        if(product.totalSale < 0){
            await prisma.product.update({
                where: {
                    id: sale.productId
                },
                data: {
                    totalSale: 0
                }
            })
            
        }

        return sale
    })

    return NextResponse.json({deletedSale, message:"Sale deleted successfully", status: 200 }, { status: 200 });
}