"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { store } from "@/lib/types";


export type StoreContextProps = {
  loading: boolean;
  storeDetails: store | null;
  setStoreDetails: React.Dispatch<React.SetStateAction<store | null>>;
};

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storeDetails, setStoreDetails] = useState<store | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const store = sessionStorage.getItem("store");

    if (store) {
      setStoreDetails(JSON.parse(store));
    }
    setLoading(false);
  },[])
  return (
    <StoreContext.Provider
      value={{
        loading,
        storeDetails,
        setStoreDetails,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

