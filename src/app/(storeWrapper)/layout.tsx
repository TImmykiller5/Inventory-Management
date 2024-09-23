"use client";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import React, { useEffect } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Nav from "@/components/nav";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { StoreDetailProvider, useStore } from "@/context/storeContext";
import { useRouter } from "next/navigation";
type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const Layout = ({ children, session }: Props) => {
 
  return (
    <div className=" ">
      <SessionProvider session={session}>
          <TooltipProvider>
              <Header />

            <div className="h-[calc(100vh-64px)] mt-16 flex flex-col   ">
              {/* <SideMenu /> */}
              {/* <Nav /> */}
              <div className="h-full w-full pl-0  ">{children}</div>
            </div>
          </TooltipProvider>
      </SessionProvider>
    </div>
  );
};

export default Layout;
