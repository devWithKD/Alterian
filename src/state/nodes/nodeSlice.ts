import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Node, NodeState, Note } from "../../interface";
import { RootState } from "../store";

const initialState: NodeState = [];

const nodesSlice = createSlice({
  name: "Nodes",
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<{ id: string }>) => {
      const currTime = Date.now();
      const newNote: Note = {
        id: action.payload.id,
        title: "Untitled",
        type: "note",
        createdTime: currTime,
        updatedTime: currTime,
        parentID: null,
        body: "",
        tagIDs: [],
      };
      state.push(newNote);
    },
    createCollection: (state, action: PayloadAction<{ id: string }>) => {
      const currTime = Date.now();
      const newColl: Node = {
        id: action.payload.id,
        title: "New Collection",
        type: "collection",
        createdTime: currTime,
        updatedTime: currTime,
        parentID: null,
      };
      state.push(newColl);
    },
    updateTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      return state.map((node) => {
        if (node.id == action.payload.id) {
          const updateTime = Date.now();
          return {
            ...node,
            title: action.payload.title,
            updatedTime: updateTime,
          };
        }
        return node;
      });
    },
    updateParent: (
      state,
      action: PayloadAction<{ id: string; parentID: string|null }>
    ) => {
      return state.map((node) => {
        if (node.id == action.payload.id) {
          const updateTime = Date.now();
          return {
            ...node,
            updatedTime: updateTime,
            parentID: action.payload.parentID,
          };
        }
        return node;
      });
    },
    updateBody: (
      state,
      action: PayloadAction<{ id: string; body: string }>
    ) => {
      return state.map((node) => {
        if (node.id == action.payload.id) {
          if (node.type !== "note") {
            throw new Error("Invalid Note ID");
          }
          const udpateTime = Date.now();
          return {
            ...node,
            updatedTime: udpateTime,
            body: action.payload.body,
          };
        }
        return node;
      });
    },
    addTag: (state, action: PayloadAction<{ id: string; tagID: string }>) => {
      return state.map((node) => {
        if (node.id == action.payload.id) {
          if (node.type !== "note") {
            throw new Error("Invalid Note ID");
          }
          const modifiedNode = node as Note;
          modifiedNode.tagIDs.push(action.payload.tagID);
          const updateTime = Date.now();
          return { ...modifiedNode, updatedTime: updateTime };
        }
        return node;
      });
    },
    deleteNode: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((node) => node.id !== action.payload.id);
    },
  },
});

const selectNode = (state: RootState) => state.nodes;

export const getNoteIDs = createSelector([selectNode], (notes) =>
  notes.map((note) => ({ id: note.id }))
);

export const getNotes = createSelector([selectNode], (notes) => {
  return notes.filter((note) => note.type == "note");
});

export const getCollectionIDs = createSelector([selectNode], (collections) =>
  collections.map((collection) => ({ id: collection.id }))
);
export const getCollections = createSelector([selectNode], (colls) =>
  colls.filter((col) => col.type == "collection")
);

export const {
  createNote,
  createCollection,
  updateTitle,
  updateParent,
  updateBody,
  addTag,
  deleteNode,
} = nodesSlice.actions;

export default nodesSlice.reducer;
