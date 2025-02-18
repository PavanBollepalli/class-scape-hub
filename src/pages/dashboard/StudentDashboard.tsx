
import { DashboardLayout } from "@/components/DashboardLayout";

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Current Courses</h3>
            <p className="text-muted-foreground">View your enrolled courses and progress</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Upcoming Assignments</h3>
            <p className="text-muted-foreground">Track your pending assignments</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Recent Grades</h3>
            <p className="text-muted-foreground">Check your latest academic performance</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
