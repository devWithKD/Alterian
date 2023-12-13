import { createSlice } from "@reduxjs/toolkit";
import { TagsState } from "../../interface";
import { v4 as uuidV4 } from "uuid";

const initialState: TagsState = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    // Create expects label as payload
    createTag: (state, action) => {
      state.push({ ...action.payload, id: uuidV4() });
    },
    // Delete expects Tag ID as payload
    deleteTag: (state, action) => {
      state = state.filter((tag) => tag.id !== action.payload);
    },
    // Update expects Tag Label as payload
    updateTag: (state, action) => {
      state = state.map((tag) => {
        if (tag.id === action.payload.id) {
          return { ...tag, label: action.payload.label };
        }
        return tag;
      });
    },
  },
});

export const { createTag, deleteTag, updateTag } = tagsSlice.actions

export default tagsSlice.reducer;
