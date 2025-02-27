import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Main Layout for general pages */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>

            {/* Dashboard Layout for dashboard-specific routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="analytics" element={<div>Analytics</div>} />
                <Route path="settings" element={<div>Settings</div>} />
                <Route path="predictions" element={<div>Predictions</div>} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
