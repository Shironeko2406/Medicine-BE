// src/Routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { TOKEN_AUTHOR, USER_LOGIN } from "./Interceptor";
import { getDataJSONStorage, getDataTextStorage } from "./UltilFunction";

const ProtectedRoute = ({ children }) => {
  const accessToken = getDataTextStorage(TOKEN_AUTHOR);
  const userLogin = getDataJSONStorage(USER_LOGIN);

  // Nếu đã đăng nhập (có token và user), cho phép vào
  if (accessToken && userLogin) {
    return children;
  }

  // Nếu chưa đăng nhập → quay về trang login ("/")
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
