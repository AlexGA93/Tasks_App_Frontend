import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthStateType, LoginUserType, RegisterUserType } from "../../types/types";
import { persistLocalStorage, userKey } from "../../utils";

// AsyncThunbk to authentication - Register, Login
export const loginUser = createAsyncThunk<void, LoginUserType>(
  "auth/login",
  async (loginForm: LoginUserType) => {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios.post("http://localhost:5000/api/auth/login",loginForm,{ headers })
    .then((response) => {
      persistLocalStorage(userKey, response.data.token);
      console.log("Token in LocalStorage");
      
    })
    .catch((err: Error) => console.error(err.message));
  
  }
);

export const registerUser = createAsyncThunk<void, RegisterUserType>(
    "auth/register",
    async (registerForm: RegisterUserType) => {
        const headers = {
            "Content-Type": "application/json",
          };
          await axios.post(
            "http://localhost:5000/api/auth/register",
            registerForm,
            { headers }
          );
    }
);

// initial state
export const initialState: AuthStateType = {
  isLoading: false,
  error: null,
};

// user slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// export const { } = authSlice.actions;
export default authSlice.reducer;
