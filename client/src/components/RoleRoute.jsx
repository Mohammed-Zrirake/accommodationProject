import { useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ roles, children }) {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/sign-up" replace />;
  const role = user.publicMetadata?.role || user.unsafeMetadata?.role;
  return roles.includes(role) ? children : <Navigate to="/" replace />;
}
