
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import AddTeacher from "./pages/dashboard/admin/AddTeacher";
import AddStudent from "./pages/dashboard/admin/AddStudent";
import AddClass from "./pages/dashboard/admin/AddClass";
import Users from "./pages/dashboard/admin/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/dashboard/admin/add-student" element={<AddStudent />} />
        <Route path="/dashboard/admin/add-class" element={<AddClass />} />
        <Route path="/dashboard/admin/users" element={<Users />} />
        
        {/* Teacher Routes */}
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        
        {/* Student Routes */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
