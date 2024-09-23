import { metadata } from './../../../layout';
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 


// this get request is not perfect and must never be called

export async function GET(
  request: Request,
  { params }: { params: { storeID: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { storeID } = params;
  const url = new URL(request.url);
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");
  const productId = url.searchParams.get("productId");
  console.log(startDate, endDate)
  const where: any = {
    storeId: storeID,
  }

  if(productId) {
    where.productId = productId
  }

  
  if(startDate && endDate) {
    where.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    }
  }
  const sales = await prismadb.sale.findMany({
    where,
    include: {
      product: true,
    },
  });
  return NextResponse.json(sales, { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: { storeID: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { storeID } = params;
  const body = await request.json();
  const requiredKeys = ["product", "quantity", "store", "price", "date"];
  if (!body) {
    return new NextResponse("No data", { status: 400 });
  }
  for (const key of requiredKeys) {
    if (!body[key]) {
      return new NextResponse(`${key} is required`, { status: 400 });
    }
  }

  const { product, quantity, store, price, date } = body;

  const sale = await prismadb.$transaction(async (prisma) => {
    const sale = await prisma.sale.create({
      data: {
        product: {
          connect: {
            id: product,
          },
        },
        quantity,
        store: {
          connect: {
            id: store,
          },
        },
        amount: price * quantity,
        createdAt: date,
        userId: session.user.id,
      },
    });
    const productUpdated = await prisma.product.update({
      where: {
        id: product,
      },
      data: {
        stock: {
          decrement: quantity,
        },
        totalSale: {
          increment: quantity,
        },
      },
    });
    if(productUpdated.stock < 0){
        throw new Error('Not Enough Stock Available for this sale');
    }
    return sale
  });

  return NextResponse.json(sale, { status: 201 });
}
