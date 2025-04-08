import { createSlice } from '@reduxjs/toolkit'

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