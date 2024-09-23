"use client";
import React, { useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Download,
  DollarSign,
  ShoppingCart,
  Package,
  Loader2,
} from "lucide-react";
import { addDays, format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { product, purchase, sale } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import DetailsHeader from "./components/detailsHeader";
import { columns, DataTable } from "./components/table";
import DatePicker from "./components/datePicker";
import TableTabs from "./components/tableTabs";
import ProductInformation from "./components/productInformation";

type Props = {
  params: {
    productID: string;
    storeId: string;
  };
};

export default function ProductDetails({ params }: Props) {
  const { toast, dismiss } = useToast();
  const [product, setProduct] = React.useState<product>();
  const [sales, setSales] = React.useState<sale[]>([]);
  const [purchases, setPurchases] = React.useState<purchase[]>([]);
  // const [activeTab, setActiveTab] = React.useState("sales");
  const [loading, setLoading] = React.useState({
    sales: false,
    purchases: false,
    product: false,
  });
  const productID = params.productID;
  const storeId = params.storeId;
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const fetchSales = async () => {
    console.log(date)

    setLoading({ ...loading, sales: true });
    try {
      const resp = await axios.get(
        `/api/sale/${storeId}?startDate=${date?.from?.toDateString()}&endDate=${date?.to?.toDateString()}&productId=${productID}`
      );
      setSales(resp.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong fetching sales data",
        action: (
          <Button variant="outline" onClick={() => fetchSales()}>
            Retry
          </Button>
        ),
      });
    } finally {
      setLoading({ ...loading, sales: false });
    }
  };

  const fetchPurchases = async () => {
    setLoading({ ...loading, purchases: true });
    try {
      const resp = await axios.get(
        `/api/purchase/${storeId}?startDate=${date?.from?.toDateString()}&endDate=${date?.to?.toDateString()}&productId=${productID}`
      );
      setPurchases(resp.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong fetching purchases data",
        action: (
          <Button variant="outline" onClick={() => fetchPurchases()}>
            Retry
          </Button>
        ),
      });
    } finally {
      setLoading({ ...loading, purchases: false });
    }
  };

  const fetchProduct = async () => {
    setLoading({ ...loading, product: true });
    try {
      const resp = await axios.get(`/api/product/${storeId}/${productID}`);
      setProduct(resp.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong fetching product data",
        action: (
          <Button variant="outline" onClick={() => fetchProduct()}>
            Retry
          </Button>
        ),
      });
    } finally {
      setLoading({ ...loading, product: false });
    }
  };

  const handleDateApply = async () => {
    if (!date?.to || !date?.from) {
      toast({
        title: "Error",
        description: "Please select a date range",
      });
      return;
    }
    fetchSales();

    fetchPurchases();
    fetchProduct();
    // try {
    //   const resp = await axios.get(`/api/purchase/${storeId}?startDate=${date?.from?.toDateString()}&endDate=${date?.to?.toDateString()}&productId=${productID}`)
    //   console.log(resp)
    // } catch (error) {

    // }
  };

  React.useEffect(() => {
    handleDateApply();
    fetchSales();
  }, []);

  const totalPurchases = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0
  );
  const totalUnitsPurchased = purchases.reduce(
    (sum, purchase) => sum + purchase.quantity,
    0
  );
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalUnitsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between md:flex-row flex-col gap-2 md:items-center mb-6">
        <h1 className="text-3xl font-bold">
          {loading.product ? (
            <div>
              {/* <Loader2 className="animate-spin h-10 w-10" /> */}
              <Skeleton className="h-9 w-40" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : product?.name ? (
            <span>{product.name}</span>
          ) : (
            <span>Product Details</span>
          )}
        </h1>

        <DatePicker
          date={date}
          setDate={setDate}
          handleDateApply={handleDateApply}
        />
      </div>

      {loading.product || loading.purchases || loading.sales ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            {" "}
            <Skeleton className="h-32 w-full" />{" "}
          </div>
          <div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      ) : (
        <DetailsHeader
          totalSales={totalSales}
          totalUnitsSold={totalUnitsSold}
          totalPurchases={totalPurchases}
        />
      )}
      {loading.product ? (
        <div className="h-48 w-full" >
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <ProductInformation product={product} />
      )}
      <TableTabs purchases={purchases} sales={sales} />

      <Card>
        <CardHeader>
          <CardTitle>Purchase Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-medium">Total Units Purchased</dt>
              <dd>{totalUnitsPurchased}</dd>
            </div>
            <div>
              <dt className="font-medium">Total Purchase Cost</dt>
              <dd>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(totalPurchases)}</dd>
            </div>
            <div>
              <dt className="font-medium">Average Cost per Unit</dt>
              <dd>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(totalPurchases / totalUnitsPurchased)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
