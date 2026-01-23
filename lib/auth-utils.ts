import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export const SignInAction = async () => {
    try {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard", 
        })
    }
    catch (err) {
        console.log(err)
    }
}

export const SignoutAction = async (router: ReturnType<typeof useRouter>) => {
    try {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        })
    }
    catch (err) {
        console.error("Sign-out failed:", err)
        throw err
    }
}
