import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li className="p-2">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
        </li>
        <li className="p-2">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
