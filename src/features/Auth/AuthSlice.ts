import { LoginTypes } from "./../../utils/types/Auth/LoginTypes.d";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialAuthState } from "../../utils/types/State/AuthState";
import { loginApi, userVerify } from "./AuthAPI";
import { UserType } from "../../utils/types/User";
import {toast} from 'react-toastify'
import { store } from "../../app/store";
import { setApp } from "../Apps/AppSlice";

export const LoginRequest = createAsyncThunk(
  "auth/login",
  async (data: LoginTypes, { rejectWithValue,dispatch }) => {
    try {
      const response = await loginApi(data);
      dispatch(setApp())
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const UserVerify = createAsyncThunk(
  "auth/userVerify",
  async (undefined, { rejectWithValue,dispatch }) => {
    try {
      const verify = await userVerify();
      dispatch(setApp())
      return verify;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: InitialAuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.user = null;

      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')

      toast.success("Oturum sonlandırıldı")

    }
  },
  extraReducers(builder) {
    builder
      .addCase(LoginRequest.fulfilled, (state, { payload }) => {
        const user: UserType = {
          email: String(payload),
        };

        state.isLoggedIn = true;
        state.user = user;
        state.loading = false;

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", user.email);

        toast.success("Success!")
      })
      .addCase(LoginRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginRequest.rejected, (state,{payload}) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user")

        toast.error(String(payload))
        

      })

      .addCase(UserVerify.fulfilled, (state, { payload }) => {
        state.user = {
          email: String(payload),
        };
        state.loading = false;
        state.isLoggedIn = true;

      })
      .addCase(UserVerify.pending,(state) => {
        state.loading = true;
      })
      .addCase(UserVerify.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      });

  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
