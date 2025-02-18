
import { DashboardLayout } from "@/components/DashboardLayout";

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Active Classes</h3>
            <p className="text-muted-foreground">Manage your current classes</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Student Progress</h3>
            <p className="text-muted-foreground">Track student performance</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Class Schedule</h3>
            <p className="text-muted-foreground">View upcoming classes</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
