// import { useAuth } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

function Logout() {
    console.log("logout");
//   const { logout } = useAuth();

  return (
    <Navigate to="/login" />
  );
}

export default Logout;
