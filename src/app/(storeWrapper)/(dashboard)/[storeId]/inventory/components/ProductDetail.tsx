"use client";

import {
  ChevronLeft,

  Loader2,

  PlusCircle,

  // Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import React, { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ui/image-upload";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { product } from "@/lib/types";
import { useStore } from "@/context/storeContext";

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";


type props = {
  product?: product;
  type: "add" | "edit";
  params: {
    storeId: string;
  }
}

export default function ProductDetail({ product, type, params }: props) {
  const { toast } = useToast();
  console.log(params)
  const { storeId } = params

  const { data: session } = useSession()
  const {storeDetails} = useStore()
  const [categories, setCategories] = React.useState([]);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loadingPro, setLoadingPro] = React.useState(false);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const productFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.coerce.number().min(1, { message: "Price is required" }),
    image: z.string().min(1, { message: "Image is required" }),
    category: z.string().min(1, { message: "Category is required" }),
  });

  type ProductFormValues = z.infer<typeof productFormSchema>;
  const productForm = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || "",
      category: product?.category?.id || "",
      
    },
  });

  const submitProduct = async (data: ProductFormValues) => {
    
    setLoadingPro(true);
    try {
      const response = await axios.post(`/api/product/${storeId}`, {...data, storeId: storeDetails?.id});
      if (response.status === 201) {
        toast({
          title: "Product created",
          description: "Product created successfully",
          duration: 5000,
        });
        productForm.reset();
        // router.push("/inventory");
        
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Product creation failed",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoadingPro(false);
    }
  };

  const editProduct = async (data: ProductFormValues) => {
    setLoadingPro(true);
    try {
      const response = await axios.patch(`/api/product/${storeId}/${product?.id}`, {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        categoryId: data.category,
      });
      if (response.status === 200) {
        toast({
          title: "Product updated",
          description: "Product updated successfully",
          duration: 5000,
        });
        // productForm.reset();
        // router.push("/inventory");
        
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Product update failed",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoadingPro(false);
    }
  };


  const [open, setOpen] = React.useState(false);

  const categoryFormSchema = z.object({
    name: z.string().min(1, { message: "Category name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  });

  type CategoryFormValues = z.infer<typeof categoryFormSchema>;
  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const deleteCategory = async (e: any, id: string) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`/api/category/${id}`);
      console.log(response);
      if (response.status === 200) {
        toast({
          title: "Category deleted",
          description: "Category deleted successfully",
          duration: 5000,
        });
        // fetchCategories()
        setCategories((prev) =>
          prev.filter((category: any) => category.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Category deletion failed",
        description: "Something went wrong",
        duration: 5000,
      });
    }
  };

  const submitCategory = async (data: CategoryFormValues) => {
    console.log(data);
    setLoading(true);
    

    try {
      const response = await axios.post("/api/category", data);
      if (response.status === 201) {
        toast({
          title: "Category created",
          description: "Category created successfully",
          duration: 5000,
        });
        setOpen(false);
        categoryForm.reset();
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Category creation failed",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  const submitHandler = (data: ProductFormValues) => {
    if (type==="add") {

      return submitProduct(data)
    } else {
      return editProduct(data)
    }
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Add a new category</DialogDescription>
          </DialogHeader>
          <Form {...categoryForm}>
            <form onSubmit={categoryForm.handleSubmit(submitCategory)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={categoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={categoryForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Form {...productForm}>
          <form onSubmit={productForm.handleSubmit(submitHandler)}>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Button onClick={
                    (e) => {
                      e.preventDefault();
                      router.refresh();
                      router.push(`/${storeId}/inventory`);
                    }
                  } variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>

                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {product?.name || "New Product"}
                  </h1>
                  {product && <Badge variant={(product?.stock > 0 ? "outline" : "destructive")} className="ml-auto sm:ml-0">
                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>}
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Product Details</CardTitle>

                        <CardDescription>
                          {/* Fill the form to create a new product */}
                          {type === "add" ? "Fill the form to create a new product" : "Edit the product details"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={productForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Product Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue="Gamer Gear Pro Controller"
                        /> */}
                          </div>
                          <div className="grid gap-3">
                            {/* <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                              className="min-h-32"
                            /> */}
                            <FormField
                              control={productForm.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Description"
                                      {...field}
                                      className="min-h-32"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Product Category</CardTitle>
                      </CardHeader>
                      <CardContent className="">
                        <div className="flex justify-between w-full items-end">
                          <div className="grid gap-3">
                            {/* <Label htmlFor="category">Category</Label>
                            <Select>
                              <SelectTrigger
                                id="category"
                                aria-label="Select category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category: any) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    <div>{category.name}</div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select> */}
                            <FormField
                              control={productForm.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="category"
                                        aria-label="Select category"
                                      >
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categories.map((category: any) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.id}
                                        >
                                          <div>{category.name}</div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Button
                              className="flex gap-1 items-center"
                              onClick={(e) => { e.preventDefault() ;setOpen(true)}}
                            >
                              <PlusCircle className="h-3.5 w-3.5" />
                              Add Category
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Product Cost Price</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={productForm.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cost Price</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Cost Price"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* <Label htmlFor="status">Status</Label>
                            <Select>
                              <SelectTrigger
                                id="status"
                                aria-label="Select status"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">
                                  Active
                                </SelectItem>
                                <SelectItem value="archived">
                                  Archived
                                </SelectItem>
                              </SelectContent>
                            </Select> */}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <FormField
                            control={productForm.control}
                            name="image"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onRemove={() => field.onChange("")}
                                    onChange={(url) => field.onChange(url)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-5">
                      <CardHeader>
                        <CardTitle>Archive Product</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div></div>
                        <Button size="sm" variant="secondary">
                          Archive Product
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button type="submit" size="sm">
                    {loadingPro? <Loader2 className="animate-spin h-4 w-4" /> : "Save Product"}
                  </Button>
                </div>
              </div>
            </main>
          </form>
        </Form>
      </div>
    </div>
  );
}
