import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = () => {
  const { loading, authAutenticated } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if (!loading && !authAutenticated)
    return (
      <Navigate
        to='/login'
        replace
      />
    );

  return <Outlet />;
};

export default ProtectRoutes;
