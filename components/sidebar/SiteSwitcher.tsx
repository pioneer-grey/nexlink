"use client"
import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { AppWindow ,WandSparkles,Sparkles } from 'lucide-react';
export function SiteSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
    const router=useRouter()
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <AppWindow className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs flex items-center gap-1">Brand</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          }>
            
          </DropdownMenuTrigger>
         <DropdownMenuContent
  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
  align="start"
  side={isMobile ? "bottom" : "right"}
  sideOffset={4}
>
  <DropdownMenuGroup>
    <DropdownMenuLabel className="text-muted-foreground text-xs pl-2 flex items-center gap-1 ">
       <WandSparkles className="size-3"/>  Brands
    </DropdownMenuLabel>
    {teams.map((team, index) => (
      <DropdownMenuItem
        key={team.name}
        onClick={() => setActiveTeam(team)}
        className="gap-2 p-2"
      >
        <div className="flex size-6 items-center justify-center rounded-md border">
          < AppWindow className="size-3.5 shrink-0" />
        </div>
        {team.name}
      </DropdownMenuItem>
    ))}
  </DropdownMenuGroup>

  <DropdownMenuSeparator />
  <DropdownMenuItem className="gap-2 p-2"
  onClick={()=>router.push("/site")}
  >
    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
      <Plus className="size-4" />
    </div>
    <div className="text-muted-foreground font-medium">Add Brands</div>
  </DropdownMenuItem>
</DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}