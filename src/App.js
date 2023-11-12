import * as React from "react";
import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import Login from "./pages/login";
import Players from "./pages/players";
import Teams from "./pages/teams";

function RequireAuth({ children }) {
  let { isAuthenticated } = useAuth();
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
export default function App() {
  return (
    <AuthProvider>
      <div className="flex justify-between m-4">
        <Link to={"/players"}>Players</Link>
        <Link to={"/teams"}>Teams</Link>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/players"
          element={
            <RequireAuth>
              <Players />
            </RequireAuth>
          }
        />
        <Route
          path="/teams"
          element={
            <RequireAuth>
              <Teams />
            </RequireAuth>
          }
        />
        {/* 404 Not Found Page Should Be Create */}
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
