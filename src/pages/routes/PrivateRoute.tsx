import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
