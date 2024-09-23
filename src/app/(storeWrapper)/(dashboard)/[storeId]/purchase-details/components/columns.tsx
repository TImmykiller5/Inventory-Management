"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import CellAction from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { purchase } from "@/lib/types";



// name: "Product 4",
// description: "Product 4 description",
// price: 39.99,
// image: "https://via.placeholder.com/300x300.png?text=Product+4",
// Restocked: new Date(),
// stock: 2,
// totalSale: 0
export const columns: ColumnDef<purchase>[] = [
  {
    id: "SERIAL",
    header: "S/N",
    cell: ({ row }) => {
      return <div className="font-bold ml-2">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "image",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                className="w-full h-full object-cover"
                src={
                  row.original.product.image ||
                  "https://via.placeholder.com/300x300.png?text=Product+4"
                }
                alt="Avatar "
              />
            </div>
          </div>
          {/* <div>
                <div className="font-bold">{row.original.name}</div>
                <div className="text-sm opacity-50">{row.original.description}</div>
              </div> */}
        </div>
      );
    },
  },
  {
    id: "name",
    accessorFn: (row) => row.product.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <div>
            <div className="">{row.original.product.name}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "amount",
    header: "Sale Amount",
    cell: ({ row }) => {
      return <div className="">{row.original.amount}</div>;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <div className="">{row.original.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</div>;

    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const MobileTableColumns: ColumnDef<purchase>[] = [
  {
    id: "SERIAL",
    header: ({ column }) => {
      return (
        <div className="whitespace-nowrap">S/N</div>
      )
    },
    cell: ({ row }) => {
      return <div className="font-bold ml-2">{row.index + 1}</div>;
    },
  },
  {
    accessorFn: (row) => row.product.name,
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <div>
            <div className="">{row.original.product.name}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "amount",
    header: "Sale Amount",
    cell: ({ row }) => {
      return <div className="">{row.original.amount}</div>;
    }
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date Created",
  //   cell: ({ row }) => {
  //     // return new Date(row.original.createdAt).toLocaleDateString()
  //     return <div className="">{row.original.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}</div>;
  //   }
  // },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
