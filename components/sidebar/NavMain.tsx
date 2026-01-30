"use client"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { House,Library } from 'lucide-react';
import { usePathname } from "next/navigation";
const items=[
    {title:"Dashboard",
        icon:House,
        url:'/dashboard'
    },
     {title:"Library",
        icon:Library,
        url:'/library'
    }
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
                     <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  }>        
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}