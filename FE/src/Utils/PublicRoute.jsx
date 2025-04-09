import { Navigate } from "react-router-dom";
import { getDataJSONStorage, getDataTextStorage } from "./UltilFunction";
import { TOKEN_AUTHOR, USER_LOGIN } from "./Interceptor";

const PublicRoute = ({ children }) => {
  const accessToken = getDataTextStorage(TOKEN_AUTHOR);
  const userLogin = getDataJSONStorage(USER_LOGIN);

  if (accessToken && userLogin) {
    // Nếu đã login → chuyển sang trang /user
    return <Navigate to="/user" replace />;
  }

  return children; // Nếu chưa login → cho phép vào Login/Register
};

export default PublicRoute;
