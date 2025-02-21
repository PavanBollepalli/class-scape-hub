
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, School, Settings } from "lucide-react";

const roleIcons = {
  student: GraduationCap,
  teacher: School,
  admin: Settings,
};

const roleLabels = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin",
};

const Auth = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") as "student" | "teacher" | "admin";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const Icon = roleIcons[role];

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  if (!role) return null;

  const handleAuthError = (error: any) => {
    console.error("Auth error:", error);
    let message = error.message;
    
    // Handle rate limiting errors
    if (error.message?.includes("security purposes")) {
      message = "Please wait a moment before trying again.";
    }
    // Handle profile/role mismatch
    else if (error.message?.includes("not registered as")) {
      message = `You are not registered as a ${roleLabels[role]}. Please use the correct role or sign up.`;
    }
    // Handle other common errors
    else if (error.message?.includes("Email not confirmed")) {
      message = "Please check your email and confirm your account before signing in.";
    }

    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    try {
      if (isLogin) {
        // Sign in flow
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        if (!signInData.user) throw new Error("No user found");

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', signInData.user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile || profile.role !== role) {
          await supabase.auth.signOut();
          throw new Error(`incorrect_role`);
        }

        toast({
          title: "Login successful",
          description: `Welcome back!`,
        });

        navigate(`/dashboard/${role}`);
      } else {
        // Sign up flow
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role,
            },
          },
        });

        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error("Failed to create user");

        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: signUpData.user.id,
              email,
              full_name: fullName,
              role,
            },
          ]);

        if (profileError) {
          await supabase.auth.signOut();
          throw profileError;
        }

        toast({
          title: "Sign up successful",
          description: "Please check your email to verify your account.",
        });

        // Reset form
        setEmail("");
        setPassword("");
        setFullName("");
        setIsLogin(true); // Switch to login view
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-6 glass rounded-xl">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-muted-foreground">
            {isLogin
              ? `Sign in to your ${roleLabels[role]} account`
              : `Sign up as a ${roleLabels[role]}`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                minLength={2}
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button 
            className="w-full" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading
              ? "Please wait..."
              : isLogin
              ? "Sign in"
              : "Create account"}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setPassword("");
              setFullName("");
            }}
            className="text-sm text-primary hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
