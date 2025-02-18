
import { LogIn } from "lucide-react";

export const LoginButton = () => {
  return (
    <button className="fixed top-4 right-4 flex items-center gap-2 glass px-4 py-2 rounded-full transition-all duration-300 hover:scale-105">
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </button>
  );
};
