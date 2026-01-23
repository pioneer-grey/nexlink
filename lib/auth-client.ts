import { createAuthClient } from "better-auth/react"

const baseURL = process.env.BETTER_AUTH_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL environment variable is not set");
}

export const authClient = createAuthClient({
    baseURL:baseURL,
})
