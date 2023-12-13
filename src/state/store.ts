import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes/notesSlice";
import tagsReducer from "./tags/tagsSclice";
import collectionsReducer from "./collections/collectionsSlice";
import currentNoteReducer from "./currentNote/currentNoteSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    tags: tagsReducer,
    collections: collectionsReducer,
    currentNote: currentNoteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
