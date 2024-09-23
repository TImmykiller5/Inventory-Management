import React from "react";
import { getServerSession } from "next-auth";
import Blocks from "./block";
import { authOptions } from "@/lib/auth"; 
import prismadb from "@/lib/prismadb";


type Props = {
  params: {
    storeId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
// export const description =
//   "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

const Page = async ({ params, searchParams }: Props) => {
  const { storeId } = params
  const range = searchParams.range ? Number(searchParams.range) : 7
  const session = await getServerSession(authOptions)

  const products = await prismadb.product.findMany({
    where: {
      storeId
    },
  })

  const stores = await prismadb.store.findMany({
    where: {
      ownerId: session?.user?.id,
      
    }
  })

  const sales = await prismadb.sale.findMany({
    where: {
      storeId,
      createdAt: {
        gte: new Date(Date.now() - range * 24 * 60 * 60 * 1000),
      }
    },
    include: {
      product: true
    }
  });

  const LastSeventyDaySales = await prismadb.sale.findMany({
    where: {
      storeId,
      createdAt: {
        gte: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000),
      }
    },
  });

  const monthSales = LastSeventyDaySales.filter((sale) => {
    return sale.createdAt >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  })

  const lastTwoMonthSales = LastSeventyDaySales.filter((sale) => {
    const startDate = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000);
    const endDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    return sale.createdAt >= startDate && sale.createdAt <= endDate;
  })

  const weekSales = monthSales.filter((sale) => {
    return sale.createdAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  })

  const lastWeekSales = monthSales.filter((sale) => {
    // return sale.createdAt >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const startDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    const endDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    return sale.createdAt >= startDate && sale.createdAt <= endDate;
  })

  return (
    <div className="flex min-h-[calc(100vh-64px)]  w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Blocks lastWeekSales={lastWeekSales} lastTwoMonthSales={lastTwoMonthSales} monthlySales={monthSales} weeklySales={weekSales} stores={stores} products={products} sales={sales} />
      </div>
    </div>
  );
};

export default Page;
