import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p>This is the landing page of the application.</p>
      <div className="mt-8">
        <Button variant="default" size="xl" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
