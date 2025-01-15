import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import Navbar from "./Navbar";
import { Logo } from "./Logo";

export default function Header({ setIsSidebarOpen, isSidebarOpen }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-20 items-center px-4 gap-4">
        {isDashboard && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Link to="/" className={`${!isDashboard ? "ml-12" : ""} flex-1`}>
          <Logo />
        </Link>
        <Navbar />
        <div className="flex items-center gap-4">
          {/* <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button> */}
          {/* <Button variant="ghost" className="gap-2">
            <span>Demo User</span>
            <ChevronDown className="h-4 w-4" />
          </Button> */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
