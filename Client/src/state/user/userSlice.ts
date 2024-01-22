import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interface";

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.data = action.payload.data;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
