import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

 return token ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
