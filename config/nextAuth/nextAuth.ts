import { URLS } from "@/service/urls.service";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          // : IResponse<IUserJWT>
          const response = await fetch(`${NEXT_PUBLIC_API_URL}${URLS.LOGIN}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }).then((res) => res.json());
          if (!response?.accessToken) return null;
          return response;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID!,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //     authorization: {
    //         params: {
    //             prompt: "consent",
    //             access_type: "offline",
    //             response_type: "code",
    //         },
    //     },
    // }),
    // FacebookProvider({
    //     clientId: process.env.FACEBOOK_CLIENT_ID!,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (user?.accessToken) {
        token.user = user.user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session.user) {
        session.accessToken = token.accessToken as string;
        session.user = token.user;
      }
      return session;
    },
    async signIn({ user, account, profile }: any) {
      // if (account?.provider === "google") {
      //     const googleProfile = profile as {
      //         email_verified?: boolean;
      //     };

      //     if (googleProfile?.email_verified === false) {
      //         console.log("❌ Email not verified");
      //         return false;
      //     }
      // }
      // try {
      //     if (account?.provider === "google") {
      //         const response: IResponse<IUserJWT> = await fetch(
      //             `${NEXT_PUBLIC_API_URL}${URLS.LOGIN_GOOGLE}`,
      //             {
      //                 method: "POST",
      //                 headers: {
      //                     "Content-Type": "application/json",
      //                 },
      //                 body: JSON.stringify({
      //                     idToken: account?.id_token,
      //                     provider: account?.provider,
      //                 }),
      //             },
      //         ).then((res) => res.json());

      //         if (!response.data?.user.id) {
      //             throw new Error("Missing Google id_token");
      //         }

      //         user.accessToken = response.data?.accessToken;
      //         user.id = response.data?.user.id;
      //     } else if (account?.provider === "facebook") {
      //         const response: IResponse<IUserJWT> = await fetch(
      //             `${NEXT_PUBLIC_API_URL}${URLS.LOGIN_FACEBOOK}`,
      //             {
      //                 method: "POST",
      //                 headers: {
      //                     "Content-Type": "application/json",
      //                 },
      //                 body: JSON.stringify({
      //                     accessToken: account?.access_token,
      //                     provider: account?.provider,
      //                 }),
      //             },
      //         ).then((res) => res.json());
      //         user.accessToken = response.data?.accessToken;
      //     }
      // } catch (err) {
      //     console.log(err);
      //     return false;
      // }
      return true;
    },
  },
};
