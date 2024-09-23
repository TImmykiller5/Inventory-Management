"use client";
import React, { useState } from 'react'
import { SalesColumn } from './columns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { DropdownMenuContent, DropdownMenu,  DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel  } from '@/components/ui/dropdown-menu';
// import toast from 'react-hot-toast';
import { useParams, usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import AlertModal from '@/components/AlertModal';
import { sale } from '@/lib/types';
// import AlertModal from '@/components/modals/alert-modals';
interface CellActionProps {
    data: sale
}



const CellAction: React.FC<CellActionProps> = (
    { data }
) => {
    const router = useRouter()
    const pathName = usePathname()
    const params = useParams() 
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const {toast} = useToast()

    const onDelete = async (id: string) => {
        try {
            setLoading(true)
            await axios.delete(`/api/sale/${pathName?.split("/")[1]}/${id}`)
            router.refresh()
            toast({
                title: 'Sale record deleted',
                description: 'The sale record has been deleted successfully',
                duration: 2000,
            })
        } catch (error) {
            // toast.error('Make sure you remove all categories using this billbord')
            toast({
                title: 'Delete failed',
                description: 'An error occurred while deleting the sale record',
                duration: 2000,
            })
        
        }finally{
            setLoading(false)
            setOpen(false)
        }   
    }
  return (
    <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
        loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className=" h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                {/* <DropdownMenuItem onClick={() => router.push(`/inventory/edit/${data.id}`)}>
                    <Edit className='mr-2 h-4 w-4' /> Update
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className='mr-2 h-4 w-4' />Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default CellAction