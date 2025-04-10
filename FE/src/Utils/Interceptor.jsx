import axios from "axios";
import { getDataTextStorage, logout } from "./UltilFunction";
import { RefreshTokenActionAsync } from "../Redux/ReducerAPI/AuthenticationReducer";
import { store } from "../Redux/Store";

const TOKEN_AUTHOR = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER_LOGIN = "userLogin";
const HOST_DOMAIN = "https://localhost:7179";
// const HOST_DOMAIN = "https://futuretech-bza4b0chcrhyeva6.eastasia-01.azurewebsites.net";

// Thêm biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let refreshSubscribers = [];

// Hàm để thêm các request thất bại vào hàng đợi
const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
}

// Hàm để thử lại các request thất bại
const onRefreshed = (token) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
}

// Cấu hình interceptors
const httpClient = axios.create({
  baseURL: HOST_DOMAIN,
  timeout: 30000,
});

httpClient.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem(TOKEN_AUTHOR);
    if (req.headers) {
      req.headers["Authorization"] = accessToken ? `Bearer ${accessToken}` : "";
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    // Xử lý lỗi response
    if (error.response) {
      // Server đã trả về một response nhưng với mã trạng thái lỗi
      switch (error.response.status) {
        case 401:
          if (!isRefreshing) {
            isRefreshing = true;
            const refreshToken = getDataTextStorage(REFRESH_TOKEN);
            const accessToken = getDataTextStorage(TOKEN_AUTHOR);

            if (refreshToken && accessToken) {
              try {
                const success = await store.dispatch(RefreshTokenActionAsync(refreshToken, accessToken));

                if (success) {
                  const newAccessToken = getDataTextStorage(TOKEN_AUTHOR);
                  onRefreshed(newAccessToken);
                  originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                  return httpClient(originalRequest);
                } else {
                  logout()

                }
              } catch (err) {
                logout()
                // Thêm logic đăng xuất/chuyển hướng ở đây
              } finally {
                isRefreshing = false;
              }
            } else {
              logout();
              // Thêm logic đăng xuất/chuyển hướng ở đây
            }
          } else {
            // Thêm request thất bại vào hàng đợi
            return new Promise(resolve => {
              addSubscriber(token => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(httpClient(originalRequest));
              });
            });
          }
          break;
        case 403:
          console.error(
            "Forbidden - you don't have permission to access this resource."
          );
          break;
        case 404:
          console.error("Resource not found.");
          break;
        case 500:
          console.error("Internal server error.");
          break;
        default:
          console.error(
            `Error ${error.response.status}: ${error.response.statusText}`
          );
      }
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được phản hồi từ server
      console.error("No response received from server.");
    } else {
      // Một số lỗi khác xảy ra trong quá trình thiết lập request
      console.error("Error setting up request: ", error.message);
    }

    return Promise.reject(error);
  }
);

export { httpClient, USER_LOGIN, TOKEN_AUTHOR, REFRESH_TOKEN, HOST_DOMAIN };
