
import { RoleCard } from "@/components/RoleCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Welcome to School Management</h1>
        <p className="text-muted-foreground">Please select your role to continue</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        <RoleCard role="student" />
        <RoleCard role="teacher" />
        <RoleCard role="admin" />
      </div>
    </div>
  );
};

export default Index;
