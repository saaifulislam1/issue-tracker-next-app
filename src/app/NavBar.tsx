"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBugSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap={"3"}>
            <Link href="/">
              <IoBugSharp size={20} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  // gives us currentPath
  const currentPath = usePathname();
  const links = [
    { label: "DashBoard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
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
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width={"3rem"}></Skeleton>;
  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Sign In </Link>;

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="cursor-pointer">
            <div>
              {" "}
              <Avatar
                src={session!.user!.image!}
                fallback="?"
                size={"2"}
                radius="full"
              />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label className="text-black">
              <Text size={"2"}> {session!.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link
                href={"/api/auth/signout"}
                className="text-center self-center"
              >
                Log Out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};
export default NavBar;
