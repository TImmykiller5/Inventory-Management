import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { columns, DataTable } from "./table";
import { purchase, sale } from "@/lib/types";
import { format } from "date-fns";

type Props = {
  sales: sale[];
  purchases: purchase[];
};

const convertToCSV = (objArray: any) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  console.log(array);
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }
    str += line + "\r\n";
  }
  return str;
};

const downloadCSV = (data: any, fileName: string) => {
  const csvData = new Blob([convertToCSV(data)], { type: "text/csv" });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvURL;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const TableTabs = ({ sales, purchases }: Props) => {
  const handleDownload = (type: "sales" | "purchases") => {
    // In a real app, this would trigger a CSV download of the data
    console.log(`Downloading ${type} data...`);
    const parser = () => {
      if (type === "sales") {
        const data: {
          name: string;
          date: string;
          quantity: number;
          saleAmount: number;
        }[] = [];
        sales.forEach((sale) => {
          data.push({
            name: sale.product.name,
            date: format(sale.createdAt, "yyyy-MM-dd"),
            quantity: sale.quantity,
            saleAmount: sale.amount,
          });
        });
        return data;
      } else {
        const data: {
          name: string;
          date: string;
          quantity: number;
          purchaseAmount: number;
        }[] = [];
        purchases.forEach((purchase) => {
          data.push({
            name: purchase.product.name,
            date: format(purchase.createdAt, "yyyy-MM-dd"),
            quantity: purchase.quantity,
            purchaseAmount: purchase.amount,
          });
        });
        return data;
      }
    };
    downloadCSV(parser(), type);
  };
  return (
    <Tabs defaultValue="sales" className="mb-6">
      <TabsList>
        <TabsTrigger value="sales">Sales Data</TabsTrigger>
        <TabsTrigger value="purchases">Purchase Data</TabsTrigger>
      </TabsList>
      <TabsContent value="sales">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sales Data</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload("sales")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={sales} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="purchases">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Purchase Data</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload("purchases")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={purchases} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TableTabs;
