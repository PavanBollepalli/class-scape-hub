
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Teacher form state
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherName, setTeacherName] = useState("");

  // Student form state
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentName, setStudentName] = useState("");

  // Class form state
  const [className, setClassName] = useState("");
  const [branch, setBranch] = useState("");

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
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

      toast({
        title: "Teacher account created",
        description: "An email has been sent for verification.",
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

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: studentEmail,
        password: studentPassword,
        options: {
          data: {
            full_name: studentName,
            role: "student",
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Student account created",
        description: "An email has been sent for verification.",
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

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from("classes")
        .insert([{ name: className, branch }]);

      if (error) throw error;

      toast({
        title: "Class created",
        description: "The new class has been added successfully.",
      });

      // Reset form
      setClassName("");
      setBranch("");
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass w-full p-6 h-auto flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Add Teacher</h3>
                <p className="text-muted-foreground">Create a new teacher account</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
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
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Teacher Account"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass w-full p-6 h-auto flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Add Student</h3>
                <p className="text-muted-foreground">Create a new student account</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
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
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Student Account"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass w-full p-6 h-auto flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Add Class</h3>
                <p className="text-muted-foreground">Create a new class</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddClass} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class Name</label>
                  <Input
                    required
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Class 10A"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Branch</label>
                  <Input
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Science"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Class"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
