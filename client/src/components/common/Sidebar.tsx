import { Home, BarChart2, TrendingUpDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Overview", path: "/dashboard" },
    { icon: BarChart2, label: "Analytics", path: "/dashboard/analytics" },
    {
      icon: TrendingUpDown,
      label: "Predictions",
      path: "/dashboard/customers",
    },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <aside
      className={cn(
        "border-r transition-all duration-200 ease-in-out",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className="w-full justify-start gap-2"
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
