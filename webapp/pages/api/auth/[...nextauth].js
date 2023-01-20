import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../db/conn";


export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await axios.get('http://localhost:8000/u/' + credentials.username);
          const data = await res.data;
          if (credentials.password == data.password) {
            return data;
          }
          else
            return null;
        } catch {
          console.log(error);
          return null;
        }
      }
    }),
  ],
  session: {
    jwt: true,
    strategy: "jwt",
  },
  jwt: {
    secret: 'XH6bp/TkLvnUkQiPDEZNyHcOCV+VV5RL/n+HdVHoHNO=',
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
}
export default NextAuth(authOptions)

