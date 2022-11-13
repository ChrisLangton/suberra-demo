import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export const config = { matcher: ["/admin"] };
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.userRole === "admin",
  },
})
