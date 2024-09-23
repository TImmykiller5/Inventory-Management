"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {}

const AddStore = (props: Props) => {
  const [newStoreName, setNewStoreName] = useState("")
  const { toast } = useToast();
  const { data: session } = useSession()
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const storeFormZod = z.object({
    name: z.string().min(1, "Store name is required"),
    location: z.string().min(1, "Store location is required"),
  });

  type StoreForm = z.infer<typeof storeFormZod>;
  const storeForm = useForm<StoreForm>({
    resolver: zodResolver(storeFormZod),
    defaultValues: {
      name: "",
      location: "",
    }
  })
  const submitForm = async (data: StoreForm) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/store", {
        name: data.name,
        location: data.location,
      });
      console.log(response);
      storeForm.reset();
      router.refresh();
      toast({
        title: "Store added",
        description: "Store added successfully",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Store creation failed",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Store</CardTitle>
          <CardDescription>Create a new store for your account</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...storeForm}>
                <form onSubmit={storeForm.handleSubmit(submitForm)}>
                    <div className="space-y-2">
                        <FormField
                            control={storeForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={storeForm.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter store location"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='mt-4' type="submit">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Store
                    </Button>
                </form>
            </Form>
       
        </CardContent>
      </Card>
  )
}

export default AddStore