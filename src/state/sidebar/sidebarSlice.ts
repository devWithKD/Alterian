import { 
  // PayloadAction, 
  createSlice, 
  // createSelector 
} from "@reduxjs/toolkit";
import { SideBarState } from "../../interface";
// import { RootState } from "../store";

const initialState: SideBarState = {
  focusedID: "",
  sortType: "A-Z",
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
