import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import SideBar from "./components/sideBar"

// export const description =
//   "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."

  
type Props = {
    children: React.ReactNode

}


const layout = ({children}: Props) => {
 
  return (
    <div className="flex min-h-[calc(100vh-80px)] sm:!pl-14 w-full flex-col">
      
      <main className="flex  flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
         
          <SideBar />
          {children}
        </div>
      </main>
    </div>
  )
}

export default layout