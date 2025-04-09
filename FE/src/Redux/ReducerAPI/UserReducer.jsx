import { createSlice } from '@reduxjs/toolkit'
import { httpClient } from '../../Utils/Interceptor';

const initialState = {
    userProfile: {}
}

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
        state.userProfile = action.payload;
    }, 
  }
});

export const {setUserProfile} = UserReducer.actions

export default UserReducer.reducer

export const RegisterActionAsync = (data) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(`/api/User`, data);

      if (res.isSuccess && res.data) {
        return { success: true, data: true, message: res.message }; // ✅ Thành công thực sự
      } else if (res.isSuccess && !res.data) {
        return { success: false, data: null, message: res.message }; // ✅ Lỗi logic (sai tài khoản)
      } else {
        return { success: false, message: res.message }; // ❌ Lỗi hệ thống
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "System error" }; // ❌ Lỗi hệ thống
    }
  };
};

export const GetUserByLoginActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await httpClient.get(`/api/User/ByLogin`);

      if (res.isSuccess && res.data) {
        dispatch(setUserProfile(res.data));
        return true;
      } else if (res.isSuccess && !res.data) {
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
};