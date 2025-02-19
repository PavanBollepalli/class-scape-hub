
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const AddClass = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState("");
  const [branch, setBranch] = useState("");

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
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Add New Class</h1>
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
      </div>
    </DashboardLayout>
  );
};

export default AddClass;
