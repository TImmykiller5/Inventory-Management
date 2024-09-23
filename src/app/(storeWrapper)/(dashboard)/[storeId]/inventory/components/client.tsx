"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ProductColumn } from "./columns";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns, MobileTableColumns } from "./columns";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Props = {
  products: ProductColumn[];
  storeId: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: ProductColumn[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<ProductColumn, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
  });
  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => router.push(`inventory/${row.original.id}`)}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const ProductClient = ({ products, storeId }: Props) => {
  return (
    <div
      className={clsx(" rounded-lg border border-dashed shadow-sm", {
        "flex flex-1 items-center justify-center": products?.length === 0,
      })}
    >
      {
        false ? (
          <div>
            <Loader2 className="animate-spin h-10 w-10" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : products?.length === 0 ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Link href={`/${storeId}/inventory/add`}>
              <Button className="mt-4">Add Product</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="hidden md:block">
              <DataTable columns={columns} data={products} />
            </div>
            <div className="block md:hidden">
              <DataTable columns={MobileTableColumns} data={products} />
            </div>
          </div>
        )
        //<div>hello</div>
      }
    </div>
  );
};

export default ProductClient;
