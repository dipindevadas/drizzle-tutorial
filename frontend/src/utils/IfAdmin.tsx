// src/components/wrappers/IfAdmin.tsx
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext"

const IfAdmin = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <>{children}</>;
  }

  return null;
};

export default IfAdmin;
