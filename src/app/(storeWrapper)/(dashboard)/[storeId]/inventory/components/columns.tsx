"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellAction from "./cell-action";

export type ProductColumn = {
    id: string
    name: string
    description: string
    price: number
    image: string | null
    Restocked: Date | null
    stock: number
    totalSale: number
}


// name: "Product 4",
// description: "Product 4 description",
// price: 39.99,
// image: "https://via.placeholder.com/300x300.png?text=Product+4",
// Restocked: new Date(),
// stock: 2,
// totalSale: 0
export const columns: ColumnDef<ProductColumn>[] = [
    {
        id: "id",
        cell: ({ row }) => {
          return (
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    className="w-full h-full object-cover"
                    src={row.original.image || "https://via.placeholder.com/300x300.png?text=Product+4"}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              {/* <div>
                <div className="font-bold">{row.original.name}</div>
                <div className="text-sm opacity-50">{row.original.description}</div>
              </div> */}
            </div>
          )
        },
       
    },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "totalSale",
    header: "Total Sale",
  },
  {
    accessorKey: "Restocked",
    header: "Last Restocked",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

export const MobileTableColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
 
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "totalSale",
    header: "Total Sale",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]