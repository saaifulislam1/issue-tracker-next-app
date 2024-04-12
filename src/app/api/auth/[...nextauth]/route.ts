import authOptions from "@/app/auth/authOption";
import NextAuth from "next-auth/next";

const hadnler = NextAuth(authOptions);
export { hadnler as GET, hadnler as POST };
