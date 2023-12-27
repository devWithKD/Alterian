import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NotesState } from "../../interface";

const initialState: NotesState = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // // CreateNote expects object consisting body and tagIDs as payload
    // createNote: (state, action) => {
    //   state.push({ ...action.payload, id: uuidV4() });
    // },
    // CreateNoteWithID expects object consisting Note ID, body and tagIDs as payload
    createNote: (state, action) => {
      state.push(action.payload);
    },
    // Delete expects Note ID as payload
    deleteNote: (state, action) => {
      return state.filter((note) => action.payload !== note.id);
    },
    updateNoteTitle: (state, action) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, title: action.payload.title };
        }
        return note;
      });
    },
    // UpdateBody expects object consisting Note ID and updated/new body as payload
    updateBody: (
      state,
      action: PayloadAction<{ id: string; body: string }>
    ) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, body: action.payload.body };
        }
        return note;
      });
    },
    // UpdateBody expects object consisting Note ID and updated/new tagIDs as payload
    updateTags: (state, action) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, tagIDs: action.payload.tagIDs };
        }
        return note;
      });
    },
    // UpdateParent expects object consisting Note ID and updated/new parent collection ID
    updateParent: (state, action) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, parentID: action.payload.parentID };
        }
        return note;
      });
    },
  },
});

export const {
  // createNote,
  createNote,
  deleteNote,
  updateNoteTitle,
  updateBody,
  updateParent,
  updateTags,
} = notesSlice.actions;

export default notesSlice.reducer;
