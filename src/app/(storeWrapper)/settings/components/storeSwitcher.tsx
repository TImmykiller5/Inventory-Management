"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { store } from "@/lib/types";
import { AlertCircle } from "lucide-react";
import { useStore } from "@/context/storeContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Props = {
  stores: store[];
};

const StoreSwitcher = ({ stores }: Props) => {
    const { setStoreDetails, storeDetails } = useStore();
    const router = useRouter()
    const {toast} = useToast();
  // const [stores, setStores] = useState([
  //   { id: 1, name: "My Store" },
  //   { id: 2, name: "Second Store" },
  // ])
  const [selectedStore, setSelectedStore] = useState(storeDetails?.id);
  const handleSelectStore = (id: string) => {
      setSelectedStore(id);

      const store = stores.find((store) => store.id.toString() === id);
      if (store) {
        setStoreDetails(store);
        sessionStorage.setItem("store", JSON.stringify(store));
        // localStorage.setItem("store", JSON.stringify(store));
        toast({
          title: "Store selected",
          description: "Store selected successfully",
          duration: 2000,
        })
        router.push(`/${store.id}/home`)

      }
  }
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Select Store</CardTitle>
        <CardDescription>Choose the store you want to manage</CardDescription>
      </CardHeader>
      <CardContent>
        {stores.length > 0 ? (
          <Select value={selectedStore || ""} onValueChange={handleSelectStore}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id.toString()}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No stores found</AlertTitle>
            <AlertDescription>
              You have no stores. Please add a store using the form below.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreSwitcher;
