
import { GraduationCap, School, Settings } from "lucide-react";

interface RoleCardProps {
  role: "student" | "teacher" | "admin";
  onClick: () => void;
}

const roleIcons = {
  student: GraduationCap,
  teacher: School,
  admin: Settings,
};

const roleLabels = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin",
};

export const RoleCard = ({ role, onClick }: RoleCardProps) => {
  const Icon = roleIcons[role];

  return (
    <button
      onClick={onClick}
      className="glass p-6 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center gap-4 min-w-[200px]"
    >
      <Icon className="w-12 h-12 text-primary" />
      <span className="text-lg font-semibold">{roleLabels[role]}</span>
    </button>
  );
};
