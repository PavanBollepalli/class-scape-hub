
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session?.user?.user_metadata?.role) {
        setUserRole(session.user.user_metadata.role);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user?.user_metadata?.role) {
        setUserRole(session.user.user_metadata.role);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return null;
  }

  const getDashboardRedirect = () => {
    if (!isAuthenticated) return "/auth";
    if (!userRole) return "/";
    return `/dashboard/${userRole}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to={getDashboardRedirect()} /> : <Index />}
            />
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to={getDashboardRedirect()} /> : <Auth />}
            />
            <Route
              path="/dashboard/student/*"
              element={
                !isAuthenticated ? (
                  <Navigate to="/auth" />
                ) : userRole !== "student" ? (
                  <Navigate to={getDashboardRedirect()} />
                ) : (
                  <StudentDashboard />
                )
              }
            />
            <Route
              path="/dashboard/teacher/*"
              element={
                !isAuthenticated ? (
                  <Navigate to="/auth" />
                ) : userRole !== "teacher" ? (
                  <Navigate to={getDashboardRedirect()} />
                ) : (
                  <TeacherDashboard />
                )
              }
            />
            <Route
              path="/dashboard/admin/*"
              element={
                !isAuthenticated ? (
                  <Navigate to="/auth" />
                ) : userRole !== "admin" ? (
                  <Navigate to={getDashboardRedirect()} />
                ) : (
                  <AdminDashboard />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
