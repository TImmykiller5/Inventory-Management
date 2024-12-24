"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Package,
  Loader2,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import AlertModal from "@/components/AlertModal";

interface Category {
  id: number;
  name: string;
  description: string;
}

type Props = {};

const Page = (props: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  //   const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const deleteCategory = async (id: string) => {
    // e.stopPropagation();
    try {
      setPostLoading(true);
      const response = await axios.delete(`/api/category/${id}`);

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
    } finally {
      setPostLoading(false);
      setOpen(false);
    }
  };

  const submitCategory = async (data: CategoryFormValues) => {
    // set(true);
    try {
      const response = await axios.post("/api/category", data);
      if (response.status === 201) {
        toast({
          title: "Category created",
          description: "Category created successfully",
          duration: 5000,
        });
        setIsAdding(false);
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
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleUpdateCategory = async (data: CategoryFormValues, id: string) => {
    try {
      setPostLoading(true);
      const response = await axios.patch(
        `/api/category/${id}`,
        data
      );

      if (response.status === 200) {
        toast({
          title: "Category updated",
          description: "Category updated successfully",
          duration: 5000,
        });
        setIsAdding(false);
        // categoryForm.reset();
        fetchCategories();
      } else {
        toast({
          title: "Category update failed",
          description: "Something went wrong",
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Category update failed",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteCategory(selectedCategory)}
        loading={postLoading}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="">
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your product categories</CardDescription>
            </div>
            <Button
              onClick={() => {
                setIsAdding(true);
                categoryForm.reset();
                setEditingId(null);
              }}
              disabled={isAdding}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Category Form */}
          {isAdding && (
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
                <div className="flex gap-2">
                  <Button
                    disabled={categoryForm.formState.isSubmitting}
                    type="submit"
                  >
                    {!categoryForm.formState.isSubmitting && (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                    {categoryForm.formState.isSubmitting && (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      </>
                    )}
                  </Button>
                  <Button
                    disabled={categoryForm.formState.isSubmitting}
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Categories List */}
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-4 rounded-lg border"
                  >
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-10">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">
                  No categories
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by creating a new category.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => {
                      setIsAdding(true);
                      categoryForm.reset();
                      setEditingId(null);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Category
                  </Button>
                </div>
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  {editingId === category.id ? (
                    // Edit Mode
                    // <div className="flex-1 space-y-4">
                    //   <Input
                    //     defaultValue={category.name}
                    //     id={`edit-name-${category.id}`}
                    //     placeholder="Category name"
                    //   />
                    //   <Input
                    //     defaultValue={category.description}
                    //     id={`edit-desc-${category.id}`}
                    //     placeholder="Category description"
                    //   />
                    //   <div className="flex gap-2">
                    //     <Button
                    //       size="sm"
                    //       onClick={() => {
                    //         const nameInput = document.getElementById(
                    //           `edit-name-${category.id}`
                    //         ) as HTMLInputElement;
                    //         const descInput = document.getElementById(
                    //           `edit-desc-${category.id}`
                    //         ) as HTMLInputElement;
                    //         handleUpdateCategory(
                    //           category.id,
                    //           nameInput.value,
                    //           descInput.value
                    //         );
                    //       }}
                    //     >
                    //       <Check className="h-4 w-4 mr-2" />
                    //       Save
                    //     </Button>
                    //     <Button
                    //       size="sm"
                    //       variant="outline"
                    //       onClick={() => setEditingId(null)}
                    //     >
                    //       <X className="h-4 w-4 mr-2" />
                    //       Cancel
                    //     </Button>
                    //   </div>
                    // </div>
                    <Form {...categoryForm}>
                      <form
                        className="flex-1 space-y-4"
                        onSubmit={categoryForm.handleSubmit(
                          (data) => handleUpdateCategory(data, String(category.id))
                        )}
                      >
                        <span className="font-medium">{category.name}</span>
                        <div className="flex-1 space-y-4">
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
                                  <Textarea
                                    placeholder="Description"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            disabled={categoryForm.formState.isSubmitting}
                            type="submit"
                          >
                            {!categoryForm.formState.isSubmitting && (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Save
                              </>
                            )}
                            {categoryForm.formState.isSubmitting && (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              </>
                            )}
                          </Button>
                          <Button
                            disabled={categoryForm.formState.isSubmitting}
                            variant="outline"
                            onClick={() => {
                              {
                                setIsAdding(false);
                                setEditingId(null);
                                categoryForm.reset();
                              }
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    // View Mode
                    <>
                      <div className="space-y-1">
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {category.description}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={postLoading}
                          onClick={() => {
                            categoryForm.setValue("name", category.name);
                            categoryForm.setValue(
                              "description",
                              category.description
                            );
                            setEditingId(category.id);
                            setIsAdding(false);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          disabled={postLoading}
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedCategory(String(category.id));
                            setOpen(true);
                          }}
                        >
                          {postLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
