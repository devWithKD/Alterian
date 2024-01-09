import { 
  createSlice, 
} from "@reduxjs/toolkit";
import { SideBarState } from "../../interface";

const initialState: SideBarState = {
  focusedID: "",
  sortType: "a-z",
  expandedView: "inherit",
};

const sidebarStateSlice = createSlice({
  name: "sidebarState",
  initialState,
  reducers: {
    updateFocusedID: (state, action: { payload: string|null; type: string }) => {
      state.focusedID = action.payload;
    },
    updateSortType: (state, action: { payload: string; type: string }) => {
      state.sortType = action.payload;
    },
    updateExpandedView: (state, action: { payload: string; type: string }) => {
      state.expandedView = action.payload;
    },
  },
});

export const { updateFocusedID, updateSortType, updateExpandedView } =
  sidebarStateSlice.actions;

export default sidebarStateSlice.reducer;
