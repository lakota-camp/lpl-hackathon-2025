import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li className="p-2">
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
        </li>
        <li className="p-2">
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
