import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import React from "react";

type Props = {
    totalSales: number;
    totalUnitsSold: number;
    totalPurchases: number;
};
const DetailsHeader = ({ totalSales, totalUnitsSold, totalPurchases }: Props) => {
    const totalSalesFormatted =   new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(totalSales)
    const totalPurchasesFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(totalPurchases)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ totalSalesFormatted }</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUnitsSold}</div>
          {/* <p className="text-xs text-muted-foreground">+15% from last month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPurchasesFormatted}</div>
          {/* <p className="text-xs text-muted-foreground">+30% from last month</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsHeader;
