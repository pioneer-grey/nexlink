
import React from "react"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
export default async function Page() {
    
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
if(session){
    return (
        <>
        <div>
            user id {session.user.id}
        </div>
        <div>
            user image 
            <img src={session.user.image || ""} alt="user image" />
        </div>
        </>
    )
}
return (
    <>
    <h1 className="text-green-500 font-bold text-2xl">Subhan</h1>
    </>
)
}