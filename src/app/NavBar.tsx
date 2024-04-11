"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";

const NavBar = () => {
  // gives us currentPath
  const currentPath = usePathname();
  // const { status, data: session } = useSession();
  // console.log(session?.user?.email);

  const links = [
    { label: "DashBoard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <IoBugSharp size={20} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
              } hover:text-zinc-800 transition-color`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
