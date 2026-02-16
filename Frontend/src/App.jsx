import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


import AdminDashboard from "./pages/admin/AdminDashboard";
import AssetManagement from "./pages/admin/AssetManagement";
import Requests from "./pages/admin/Requests";
import ReturnTracking from "./pages/admin/ReturnTracking";

import UserDashboard from "./pages/user/Dashboard";
import AvailableAssets from "./pages/user/AvailableAssets";
import MyRequests from "./pages/user/MyRequests";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
       <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/assets"
    element={
      <ProtectedRoute role="admin">
        <AssetManagement />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/requests"
    element={
      <ProtectedRoute role="admin">
        <Requests />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/returns"
    element={
      <ProtectedRoute role="admin">
        <ReturnTracking />
      </ProtectedRoute>
    }
  />

  <Route
    path="/user/dashboard"
    element={
      <ProtectedRoute role="employee">
        <UserDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/user/assets"
    element={
      <ProtectedRoute role="employee">
        <AvailableAssets />
      </ProtectedRoute>
    }
  />

  <Route
    path="/user/requests"
    element={
      <ProtectedRoute role="employee">
        <MyRequests />
      </ProtectedRoute>
    }
  />
</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
