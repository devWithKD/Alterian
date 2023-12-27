import { createSlice } from "@reduxjs/toolkit";
import { CollectionsState } from "../../interface";
// import { v4 as uuidV4 } from "uuid";

const initialState: CollectionsState = [];

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    // Create expects object consisting label and array of Note IDs as payload
    createCollection: (state, action) => {
      state.push({ ...action.payload });
    },
    // Delete expects Collection ID as payload
    deleteCollection: (state, action) => {
      state = state.filter((note) => action.payload !== note.id);
    },
    // UpdateNotes expects updated/new array of Note IDs
    updateNotes: (state, action) => {
      state = state.map((collection) => {
        if (collection.id === action.payload.id) {
          return { ...collection, noteIDs: action.payload.noteIDs };
        }
        return collection;
      });
    },
  },
});

export const { createCollection, deleteCollection, updateNotes } =
  collectionsSlice.actions;

export default collectionsSlice.reducer;
