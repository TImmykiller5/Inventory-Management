import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProductClient from "./components/client";
import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";

// export const description =
//   "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";
const Page = async ({ params}: { params: { storeId: string } }) => {
  const { storeId } = params;
  const session = await getServerSession(authOptions);
  const products = await prismadb.product.findMany({
    include: {
      category: true,
      owner: true,
      
    }, where: {
      storeId,
      ownerId: session?.user?.id
    }
  });

  return (
    <div className="flex  w-full h-full sm:!pl-14 flex-col ">
      <div className=" flex h-full w-full ">
        <div className="flex h-full w-full flex-col">
          <main className="flex flex-1 flex-col h-full gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
              <Link href={`/${storeId}/inventory/add`}>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </Link>
            </div>
            <ProductClient storeId={storeId} products={products} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;
