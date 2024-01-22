import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectedNote } from "../../interface";

const initialState: SelectedNote = {
  id: "",
};

const currentNoteSlice = createSlice({
  initialState,
  name: "currentNote",
  reducers: {
    setCurrentNote: (state, action: PayloadAction<SelectedNote>) => {
      state.id = action.payload.id;
    },
  },
});

export const { setCurrentNote } = currentNoteSlice.actions;

export default currentNoteSlice.reducer;
