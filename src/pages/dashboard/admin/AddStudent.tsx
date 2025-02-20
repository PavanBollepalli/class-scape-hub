
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const AddStudent = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: studentEmail,
        password: studentPassword,
        email_confirm: true,
        user_metadata: {
          full_name: studentName,
          role: "student",
        },
      });

      if (authError) throw authError;

      // Then, update the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: studentName,
          role: "student",
        })
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      toast({
        title: "Student account created",
        description: "Student has been successfully added to the system.",
      });

      // Reset form
      setStudentEmail("");
      setStudentPassword("");
      setStudentName("");
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
        <h1 className="text-3xl font-bold">Add New Student</h1>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              required
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="student@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              required
              type="password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Student Account"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddStudent;
