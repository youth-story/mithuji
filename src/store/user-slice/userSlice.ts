import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api";
import { verification } from "../../App";
import axios from "../../utils/api";
import { BASEURL } from "../../utils/constants";

export const registerUser = createAsyncThunk("user/registerUser", async ({ userData, navigate }: any, { rejectWithValue }) => {
    try {
        // console.log(userData);
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.post("/cauth/signup", userData, config);
        console.log(data);
        navigate(verification);
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})


export const loginUser = createAsyncThunk("user/loginUser", async (userData: any, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        // console.log(userData);
        const { data } = await axios.post("/cauth/signin", userData, config);
        // console.log(data);
        return data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const loadUser = createAsyncThunk<{ name: string; email: string }, void>(
    'user/loadUser',
    async () => {
      try {
        const token = localStorage.getItem('auth_token');
        // console.log(token);
  
        const response = await fetch(`${BASEURL}/customer/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
  
        // console.log(response);
        const data = await response.json();
        // console.log(data.response[0]);
        return data.response[0];
      } catch (error) {
        console.log(error);
      }
    },
  );


  export const loadSeller = createAsyncThunk<{ name: string; email: string }, void>(
    'becomeseller',
    async () => {
      try {
        const token = localStorage.getItem('auth_token');
        // console.log(token);
  
        const response = await fetch(`${BASEURL}/becomeseller`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
  
        // console.log(response);
        const data = await response.json();
        // console.log(data.response[0]);
        return data.response[0];
      } catch (error) {
        console.log(error);
      }
    },
  );
  
  // export const sellerRegister = createAsyncThunk<void>(
  //   '/becomeseller',
  //   async () => {
  //     try {
  //       const token = localStorage.getItem('auth_token');
  //       console.log(token);
  
  //       const response = await fetch(`${BASEURL}/becomeseller`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({}),
  //       });
  
  //       console.log(response);
  //       const data = await response.json();
  //       console.log(data.response[0]);
  //       return data.response[0];
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // );
  



//----------------------------------- Reducer ------------------------//

interface UserState {
    user: { name: string; email: string } | null;
    loading: boolean;
  }
  
  const initialState: UserState = {
    user: null,
    loading: true,
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.customerDTO;
        state.loading = false;
        localStorage.setItem('auth_token', action.payload.jwt);
      });
      builder.addCase(loadUser.fulfilled, (state, action: PayloadAction<{ name: string; email: string }>) => {
        state.user = action.payload;
        state.loading = false;
      });
    },
  });

  

  // interface Seller {
  //   name: string;
  //   email: string;
  // }
  
  // interface SellerState {
  //   seller: Seller | null;
  //   loading: boolean;
  // }

  // const initialSellerState: SellerState = {
  //   seller: null,
  //   loading: true,
  // };

  // const sellerSlice = createSlice({
  //   name: 'seller',
  //   initialState: initialSellerState,
  //   reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(loadSeller.fulfilled, (state, action: PayloadAction<Seller>) => {
  //       state.seller = action.payload;
  //       state.loading = false;
  //     });
  //   },
  // });
  
  const logoutSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
      },
    },
  });
  
  export const { logout } = logoutSlice.actions;

  // export const sellerReducer = sellerSlice.reducer;
// export const userReducer = userSlice.reducer;
// export default sellerSlice.reducer;
  
  

export default userSlice.reducer;