
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
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: teacherEmail,
        password: teacherPassword,
        email_confirm: true,
        user_metadata: {
          full_name: teacherName,
          role: "teacher",
        },
      });

      if (authError) throw authError;

      // Then, update the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: teacherName,
          role: "teacher",
        })
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      toast({
        title: "Teacher account created",
        description: "Teacher has been successfully added to the system.",
      });

      // Reset form
      setTeacherEmail("");
      setTeacherPassword("");
      setTeacherName("");
    } catch (error: any) {
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
