import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../Utils/Interceptor";

const initialState = {
  medicines: [],
};

const MedicineReducer = createSlice({
  name: "MedicineReducer",
  initialState,
  reducers: {
    setMedicine: (state, action) => {
      state.medicines = action.payload;
    },
  },
});

export const { setMedicine } = MedicineReducer.actions;

export default MedicineReducer.reducer;

export const GetMedicineActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await httpClient.get(`/api/Medicine/ByLogin`);

      if (res.isSuccess && res.data) {
        dispatch(setMedicine(res.data));
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

export const DeleteMedicineActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.delete(`api/Medicine/${id}`);
      if (res.isSuccess && res.data) {
        await dispatch(GetMedicineActionAsync())
        return { success: true, data: null, message: res.message }; // ✅ Thành công thực sự
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

export const CreateMedicineActionAsync = (data) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(`api/Medicine`, data);
      if (res.isSuccess && res.data) {
        await dispatch(GetMedicineActionAsync())
        return { success: true, data: null, message: res.message }; // ✅ Thành công thực sự
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

export const EditMedicineActionAsync = (data, id) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.put(`api/Medicine/${id}`, data);
      if (res.isSuccess && res.data) {
        await dispatch(GetMedicineActionAsync())
        return { success: true, data: null, message: res.message }; // ✅ Thành công thực sự
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
