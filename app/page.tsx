"use client"
import { SignoutAction } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import {ModeToggle} from "@/components/theme-toggle"

export default function Page() {
 const router=useRouter()
    
return (
    <div className="flex gap-4 p-5 h-screen">
    <Button onClick={()=>SignoutAction(router)} variant={"destructive"}>Logout</Button>
    <Button onClick={()=>router.push("/dashboard")}>Dashboard</Button>
    <Button onClick={()=>router.push("/site")} variant={"secondary"}
        className={"p-4"}
        >Site</Button>
    <ModeToggle/>
    </div>
)
}