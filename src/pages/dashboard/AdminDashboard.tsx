
import { DashboardLayout } from "@/components/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-muted-foreground">Manage students and teachers</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">System Analytics</h3>
            <p className="text-muted-foreground">Monitor platform usage</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-muted-foreground">Configure system preferences</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
