"use client"
import * as React from "react"
import { NavUser } from "@/components/sidebar/NavUser"
import { BrandSwitcher } from "@/components/sidebar/BrandSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
 
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BrandSwitcher/>
      </SidebarHeader>
      <SidebarContent>
<NavMain/>
     </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}