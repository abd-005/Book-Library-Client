import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth;

  if (loading) {
    return <div><Loading/></div>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;