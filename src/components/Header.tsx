"use client";
import {
  X,
  MenuIcon,
  Bell,
  Package2,
  Menu,
  Search,
  CircleUser,
  Badge as BadgeIcon,
} from "lucide-react";
// import AuthContext from "../AuthContext";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useStore } from "@/context/storeContext";
import React from "react";
import { product } from "@/lib/types";
import { Separator } from "./ui/separator";

// import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inventory", href: "/inventory", current: false },
  { name: "Purchase Details", href: "/purchase-details", current: false },
  { name: "Sales", href: "/sales", current: false },
  { name: "Manage Store", href: "/manage-store", current: false },
];

const userNavigation = [{ name: "Sign out", href: "./login" }];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const Links = [
  {
    name: "Dashboard",
    href: "/home",
  },
  {
    name: "Inventory",
    href: "/inventory",
  },
  {
    name: "Purchase Details",
    href: "/purchase-details",
  },
  {
    name: "Sales",
    href: "/sales",
  },
  {
    name: "Manage Store",
    href: "/settings/general",
  },
];

export default function Header() {
  const pathname = usePathname();

  type productData = {
    loading: boolean;
    data: product[];
  };
  const [open, setOpen] = React.useState(false);
  const session = useSession();
  const [searchParam, setSearchParam] = React.useState("");
  const [products, setProducts] = React.useState<productData>({
    loading: false,
    data: [],
  });
  const [filteredProducts, setFilteredProducts] = React.useState<product[]>([]);
  // const [open, setOpen ] = React.useState(false)
  const router = useRouter();
  const { storeDetails } = useStore();

  const getProducts = async () => {
    setProducts({
      loading: true,
      data: [],
    });
    try {
      const res = await axios.get(`/api/product/${storeDetails?.id}`);
      console.log(res.data);
      setProducts({
        loading: false,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
      setProducts({
        loading: false,
        data: [],
      });
    }
  };

  React.useEffect(() => {
    getProducts();
  }, [storeDetails]);
  const logout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    signOut();
    router.push("/login");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
    if (products.loading) return;
    if (e.target.value) {
      console.log(products);
      const filtered = products.data.filter((product) =>
        product.name
          .toLowerCase()

          .includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <header className="fixed w-full z-50 bg-white top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {Links.map((link) => (
          <Link
            key={link.name}
            href={
              link.name !== "Manage Store"
                ? `/${storeDetails?.id}${link.href}`
                : link.href
            }
            className={clsx(
              "transition-colors hover:text-foreground text-muted-foreground text-nowrap",
              {
                "!text-foreground":
                  link.name !== "Manage Store"
                    ? pathname.split("/")[2] === link.href.split("/")[1]
                    : pathname.split("/")[1] === link.href.split("/")[1],
              }
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {Links.map((link) => (
              <SheetClose asChild key={link.name}>
                <Link
                  key={link.name}
                  href={
                    link.name !== "Manage Store"
                      ? `/${storeDetails?.id}${link.href}`
                      : link.href
                  }
                  className={clsx(
                    "transition-colors hover:text-foreground text-muted-foreground text-nowrap",
                    {
                      "!text-foreground":
                        pathname.split("/")[2] === link.href.split("/")[1],
                    }
                  )}
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={onInputChange}
              value={searchParam}
              name="search"
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
            <div className="absolute group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto transition-all opacity-0 scale-50 pointer-events-none max-h-32 overflow-y-scroll top-[130%] p-2 w-full shadow-md rounded-sm bg-white ">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Link
                    href={`/${storeDetails?.id}/inventory/${product.id}`}
                    className=" w-full pointer-events-auto hover:bg-muted"
                    key={index}
                  >
                    <div className=" flex gap-2 hover:bg-muted h-full ">
                      <div className="h-10 w-10">
                        <img
                          className="w-full h-full object-cover"
                          src={product.image || ""}
                          alt={`image of  ${product.name}`}
                        />
                      </div>
                      <div className=" block my-auto text-sm ">
                        {product.name}
                      </div>
                    </div>
                    <Separator
                      className={clsx("my-2", {
                        hidden: index === filteredProducts.length - 1,
                      })}
                    />
                  </Link>
                ))
              ) : (
                <div
                  // href={`/${storeDetails?.id}/products`}
                  className="block px-4 mx-auto w-full text-sm py-2 hover:bg-muted"
                >
                  <span>
                    No products found.
                  </span>
                </div>
              )}
            </div>
          </div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuContent>
              <DropdownMenuLabel className="">
                <div>Products in {storeDetails?.name}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="">
              {/* <Badge>{session.data?.user.role}</Badge> */}
              <div>Hi, {session.data?.user.name?.split(" ")[0]}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
