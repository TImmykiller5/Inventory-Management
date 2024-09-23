import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, PlusCircle, Store, Trash2 } from "lucide-react"
import StoreSwitcher from "../components/storeSwitcher"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

import AddStore from "../components/addStore"
import DeleteStore from "../components/deleteStore"
import prismadb from "@/lib/prismadb"



export default async function StoreSettings() {
  const session = await getServerSession(authOptions);
  // const stores =[ 
  //   { id: 1, name: "My Store" },
  //   { id: 2, name: "Second Store" },
  // ]
  // const 
  const stores = await prismadb.store.findMany({
    where: {
      ownerId: session?.user?.id
    }
  })

  const handleDeleteStore = async (id: string) => {
    
    try {
      prismadb.store.delete({
        where: {
          id,
          ownerId: session?.user?.id
        }
      })
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
      
      <StoreSwitcher stores={stores} />

      
      <AddStore />
      <DeleteStore stores={stores} />
      
    </div>
  )
}