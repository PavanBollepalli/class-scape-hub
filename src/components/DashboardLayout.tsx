
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { GraduationCap, School, Settings, Home, Book, Calendar, Users, MessageSquare, BarChart, UserPlus, BookPlus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "teacher" | "admin";
}

const menuItems = {
  student: [
    { title: "Dashboard", icon: Home, path: "/dashboard/student" },
    { title: "Courses", icon: Book, path: "/dashboard/student/courses" },
    { title: "Schedule", icon: Calendar, path: "/dashboard/student/schedule" },
    { title: "Messages", icon: MessageSquare, path: "/dashboard/student/messages" },
  ],
  teacher: [
    { title: "Dashboard", icon: Home, path: "/dashboard/teacher" },
    { title: "Classes", icon: Users, path: "/dashboard/teacher/classes" },
    { title: "Schedule", icon: Calendar, path: "/dashboard/teacher/schedule" },
    { title: "Messages", icon: MessageSquare, path: "/dashboard/teacher/messages" },
  ],
  admin: [
    { title: "Dashboard", icon: Home, path: "/dashboard/admin" },
    { title: "Add Teacher", icon: UserPlus, path: "/dashboard/admin" },
    { title: "Add Student", icon: UserPlus, path: "/dashboard/admin" },
    { title: "Add Class", icon: BookPlus, path: "/dashboard/admin" },
    { title: "Users", icon: Users, path: "/dashboard/admin/users" },
    { title: "Analytics", icon: BarChart, path: "/dashboard/admin/analytics" },
    { title: "Settings", icon: Settings, path: "/dashboard/admin/settings" },
  ],
};

const roleIcons = {
  student: GraduationCap,
  teacher: School,
  admin: Settings,
};

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const Icon = roleIcons[role];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-4 flex items-center gap-2">
              <Icon className="w-6 h-6 text-primary" />
              <span className="font-semibold">ClassScape</span>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems[role].map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <button 
                          onClick={() => navigate(item.path)}
                          className="flex items-center gap-2 w-full"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 space-y-4">
              <ThemeToggle />
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
