import { configureStore } from "@reduxjs/toolkit";
// import notesReducer from "./notes/notesSlice";
import tagsReducer from "./tags/tagsSclice";
// import collectionsReducer from "./collections/collectionsSlice";
import currentNoteReducer from "./currentNote/currentNoteSlice";
import sidebarStateReducer from "./sidebar/sidebarSlice";
import nodesReducer from "./nodes/nodeSlice"

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    // notes: notesReducer,
    tags: tagsReducer,
    // collections: collectionsReducer,
    currentNote: currentNoteReducer,
    sidebarState: sidebarStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
