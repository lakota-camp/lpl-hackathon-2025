import Navbar from "./Navbar";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="bg-background">
      <div className="p-4">
        <Navbar />
      </div>
      <div>
        <Separator />
      </div>
    </header>
  );
}
