"use client";
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {}

const links = [
    {name: "General", href: "/settings/general"},
    // {name: "Security", href: "/security"},
  //   {name: "Integrations", href: "/integrations"},
  //   {name: "Support", href: "/support"},
  //   {name: "Organizations", href: "/organizations"},
  //   {name: "Advanced", href: "/advanced"},
  ]
  

const SideBar = (props: Props) => {
    const pathname = usePathname();
  
  return (
    <nav
    className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
  >
    {/* <Link href="#" className="font-semibold text-primary">
      General
    </Link>
    <Link href="#">Security</Link>
    <Link href="#">Integrations</Link>
    <Link href="#">Support</Link>
    <Link href="#">Organizations</Link>
    <Link href="#">Advanced</Link> */}

    {links.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className={clsx(
            "",

            {
              "text-primary font-semibold": pathname.split("/")[2] === link.href.split("/")[2],
            }
        )}
      >
        {link.name}
      </Link>
    ))}
  </nav>
  )
}

export default SideBar