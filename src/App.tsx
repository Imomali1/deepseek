import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import NewLogin from "./pages/NewLogin";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import Inventory from "./pages/NewInventory";
import Logout from "./pages/Logout";
import POSSystem from "./components/POSSystem";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import ProductManagement from "./components/Inventory/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {/* <Route element={<PublicRoute />}> */}
          <Route path="/login" element={<NewLogin />} />
          <Route path="/signup" element={<SignUp />} />
        {/* </Route> */}

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<POSSystem />} />
          <Route path="/products" element={<Products/> } />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout/>} />
        </Route>

        {/* Default Redirects */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
