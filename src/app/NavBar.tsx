"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
  // gives us currentPath
  const currentPath = usePathname();

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
          <Link
            key={link.href}
            href={link.href}
            className={`${
              link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-color`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
