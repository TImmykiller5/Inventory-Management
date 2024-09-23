"use client";
import React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { product, store } from "@/lib/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/context/storeContext";

type Props = {
  products: Partial<product>[];
  stores: store[];
};

const CreatePurchase = ({ products, stores }: Props) => {
  const {toast} = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const {storeDetails} = useStore()
  const [open, setOpen] = React.useState(false);
  const quantityRef = React.useRef<HTMLInputElement>(null);
  const formSchema = z.object({
    product: z.string().min(1, { message: "Product is required" }),
    quantity: z.coerce.number().min(1, { message: "Quantity is required" }),
    store: z.string().min(1, { message: "Store is required" }),
    price: z.coerce.number({message: "Price is required"}).min(1, { message: "Price is required" }),
    date: z.date({
      required_error: "A date of birth is required.",
    }),
  })
  type settingFormValues = z.infer<typeof formSchema>;
  const form = useForm<settingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      // quantity: 0,
      store: storeDetails?.id || "",
      // price: 0,
      date: new Date(),
    },
  });
  React.useEffect(() => {
   form.setValue("store", storeDetails?.id || "")
  }, [form]);



  const onSubmit = async (data: settingFormValues) => {
    try {
      const resp = await axios.post(`/api/purchase/${pathname.split("/")[1]}`, data);
      console.log(resp);
      if (resp.status === 201) {
        // setLoading(false)
        form.reset();
        toast({
          title: "Purchase Created",
          description: "Purchase created successfully",
        })
        router.refresh() 
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      })
      
    } finally {
      setOpen(false)
    }

  };
  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Your Purchases</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Transform Your Purchases Strategy with Our Dynamic Purchases Dashboard for
          Actionable Insights and Unparalleled Visibility.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Purchase</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Purchase</DialogTitle>
              <DialogDescription>
                Input purchase details to create a new purchase.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2 gap-2 grid grid-cols-2">
                  <div className=" col-span-2">
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product</FormLabel>
                          {form.formState.errors.product && (
                            <FormMessage className="text-xs font-medium text-[#DC2626]">
                              {form.formState.errors.product.message}
                            </FormMessage>
                          )}
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem
                                  key={product.id}
                                  value={product.id as string}
                                >
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" col-span-2">
                    <FormField
                      control={form.control}
                      name="store"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store</FormLabel>
                          {form.formState.errors.store && (
                            <FormMessage className="text-xs font-medium text-[#DC2626]">
                              {form.formState.errors.store.message}
                            </FormMessage>
                          )}
                          <Select defaultValue={storeDetails?.id} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Store" />
                            </SelectTrigger>
                            <SelectContent>
                              {stores.map((store) => (
                                <SelectItem
                                  key={store.id}
                                  value={store.id as string}
                                >
                                  {store.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" col-span-1">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          {form.formState.errors.quantity && (
                            <FormMessage className="text-xs font-medium text-[#DC2626]">
                              {form.formState.errors.quantity.message}
                            </FormMessage>
                          )}
                          <Input
                            type="number"
                            placeholder="Quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...field}
                            ref={quantityRef}
                            min={0}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" col-span-1">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          {form.formState.errors.price && (
                            <FormMessage className="text-xs font-medium text-[#DC2626]">
                              {form.formState.errors.price.message}
                            </FormMessage>
                          )}
                          <Input
                            type="number"
                            placeholder="price"
                            className="input input-bordered w-full max-w-xs"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex col-span-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          {form.formState.errors.date && (
                            <FormMessage className="text-xs font-medium text-[#DC2626]">
                              {form.formState.errors.date.message}
                            </FormMessage>
                          )}
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto z-[1000] p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex">
                  <Button disabled={form.formState.isSubmitting} className="mt-6 mx-auto w-1/2" type="submit">
                    {" "}
                    Create{" "}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default CreatePurchase;
