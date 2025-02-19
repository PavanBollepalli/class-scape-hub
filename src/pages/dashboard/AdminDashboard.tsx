
import { DashboardLayout } from "@/components/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin dashboard. Use the sidebar menu to manage teachers, students, and classes.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
