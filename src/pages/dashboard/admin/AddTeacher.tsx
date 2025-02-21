
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const AddTeacher = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create user with auth signup
      const { data, error } = await supabase.auth.signUp({
        email: teacherEmail,
        password: teacherPassword,
        options: {
          data: {
            full_name: teacherName,
            role: "teacher",
          },
        },
      });

      if (error) throw error;

      // Insert into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user?.id,
            email: teacherEmail,
            full_name: teacherName,
            role: "teacher",
          },
        ]);

      if (profileError) throw profileError;

      toast({
        title: "Teacher account created",
        description: "Please check your email for verification.",
      });

      // Reset form
      setTeacherEmail("");
      setTeacherPassword("");
      setTeacherName("");
    } catch (error: any) {
      console.error("Error creating teacher:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Add New Teacher</h1>
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              required
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              required
              type="email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="teacher@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              required
              type="password"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Teacher Account"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddTeacher;
