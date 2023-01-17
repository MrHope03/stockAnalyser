import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
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
      async authorize(credentials, req) {
        console.log(credentials)
        const res = await axios.get('http://localhost:8000/user/' + credentials.username);
        const data = await res.data;
        if (credentials.password == data.password) {
          return { email: data.email, name: data.username };
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/signup'
  }

}
export default NextAuth(authOptions)


