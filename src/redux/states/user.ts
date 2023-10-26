import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, clearLocalStorage, userKey } from "../../utils";
import { UserStateType, UserType } from "../../types/types";
import axios from "axios";



export const getUserInfo = createAsyncThunk<UserType, void>(
    "user/getInfo",
    async () => {
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": getLocalStorage(userKey)
        };
        
        const userInfo = await axios.get("http://localhost:5000/api/users/user",{headers});
        return userInfo.data;
    }
);

export const initialState: UserStateType = {
    user:{
        _id: '',
        username:'',
        email:''
    },
    isLoading: false,
    error: null,
  };
  
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
      logout(state) {
        // clear local storage
        clearLocalStorage(userKey);
        // clear state
        state.user = initialState.user;
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.error = null;
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    }
  });

  export const { logout } = userSlice.actions;
export default userSlice.reducer;