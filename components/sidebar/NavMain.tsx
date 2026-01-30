"use client"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { House,Library,WandSparkles } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from "next/link";
const items=[
    {title:"Dashboard",
        icon:House,
        url:'/dashboard'
    },
     {title:"Library",
        icon:Library,
        url:'/library'
    },
      {title:"Brands",
        icon:WandSparkles,
        url:'/brands'
    },

]

export function NavMain() {
    const path =usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                  isActive={path.startsWith(item.url)?true:false}
                  render={
                     <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  }>        
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}