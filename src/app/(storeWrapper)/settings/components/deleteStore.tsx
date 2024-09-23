"use client";
import { store } from "@/lib/types";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Store, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import AlertModal from "@/components/AlertModal";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/context/storeContext";

type Props = {
  stores: store[];
};

const DeleteStore = ({ stores }: Props) => {
  const { setStoreDetails, storeDetails } = useStore();

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState("");
  const { toast } = useToast();

  const handleDeleteStore = async (id: string) => {
    try {
      if (stores.length === 1) {
        toast({
          title: "Delete failed",
          description: "You must have at least one store",
          duration: 2000,
        });
        return;
      }
      setLoading(true);

      const response = await axios.delete(`/api/store/${id}`);
      console.log(response);
      router.refresh();
      if (response.status === 200) {
        storeDetails?.id === id &&  setStoreDetails(null);
      }

      toast({
        title: "Store deleted",
        description: "Store deleted successfully",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Store deletion failed",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Card>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDeleteStore(selectedStore)}
        loading={loading}
      />
      <CardHeader>
        <CardTitle>Manage Stores</CardTitle>
        <CardDescription>View and delete your stores</CardDescription>
      </CardHeader>
      <CardContent>
        {stores.length > 0 ? (
          <ul className="space-y-4">
            {stores.map((store) => (
              <li
                key={store.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg"
              >
                <div className="flex items-center">
                  <Store className="mr-2 h-5 w-5" />
                  <span>{store.name}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedStore(store.id);
                    setOpen(true);
                  }}
                  disabled={stores.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No stores found</AlertTitle>
            <AlertDescription>
              You have no stores. Please add a store using the form above.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          You can&apos;t delete your last remaining store.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DeleteStore;
