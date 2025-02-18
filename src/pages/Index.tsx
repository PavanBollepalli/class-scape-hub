
import { LoginButton } from "@/components/LoginButton";
import { RoleCard } from "@/components/RoleCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin" | null>(null);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <LoginButton />
      <ThemeToggle />
      
      <main className="container mx-auto px-4 py-20">
        <div className="space-y-6 text-center animate-fadeIn">
          <span className="px-4 py-1 text-sm rounded-full glass inline-block">
            Welcome to
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">
            Class<span className="text-primary">Scape</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern classroom management system designed to streamline education and enhance learning experiences
          </p>
        </div>

        <div className="mt-20">
          <div className="text-center mb-10 animate-fadeIn">
            <span className="px-4 py-1 text-sm rounded-full glass inline-block">
              Get Started
            </span>
            <h2 className="text-2xl font-semibold mt-4">Select your role</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 animate-fadeIn">
            <RoleCard role="student" onClick={() => setSelectedRole("student")} />
            <RoleCard role="teacher" onClick={() => setSelectedRole("teacher")} />
            <RoleCard role="admin" onClick={() => setSelectedRole("admin")} />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
          <div className="glass p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
            <p className="text-muted-foreground">
              Track attendance and performance with intuitive visualizations
            </p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p className="text-muted-foreground">
              Secure and personalized experience for every user
            </p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground">
              Stay informed with instant notifications and updates
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
