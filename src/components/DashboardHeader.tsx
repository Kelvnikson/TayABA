import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = () => {
  return (
    <div className="w-full h-20 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-gray-800">
        ABA Therapy Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <Avatar>
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=therapist1" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default DashboardHeader;
