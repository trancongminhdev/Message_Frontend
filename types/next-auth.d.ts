import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string | null;
        user: any & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string | null;
        user: any
    }
}