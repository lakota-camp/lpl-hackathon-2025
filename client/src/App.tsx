import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { DemoChart } from "./charts/DemoBarChart";
import { DemoAreaGraph } from "./charts/DemoAreaGraph";
import { PieDonut } from "./charts/DemoPieDonut";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-center text-5xl font-bold p-8">LPL Hackathon 2025</h1>
      <div className="p-4 text-center">
        <ModeToggle />
      </div>
      <Router>
        <div className="p-4 text-center">
          <nav>
            <ul className="flex justify-center gap-4">
              <li className="p-2">
                <Button asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li className="p-2">
                <Button asChild>
                  <Link to="/chart-one">Chart One</Link>
                </Button>
              </li>
              <li className="p-2">
                <Button asChild>
                  <Link to="/chart-two">Chart Two</Link>
                </Button>
              </li>
              <li className="p-2">
                <Button asChild>
                  <Link to="/chart-three">Chart Three</Link>
                </Button>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/chart-one" element={<DemoChart />} />
            <Route path="/chart-two" element={<DemoAreaGraph />} />
            <Route path="/chart-three" element={<PieDonut />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
