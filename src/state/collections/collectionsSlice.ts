// import { createSlice, createSelector } from "@reduxjs/toolkit";
// import { CollectionsState } from "../../interface";
// import { RootState } from "../store";
// // import { v4 as uuidV4 } from "uuid";

// const initialState: CollectionsState = [];

// const collectionsSlice = createSlice({
//   name: "collections",
//   initialState,
//   reducers: {
//     // Create expects object consisting label and array of Note IDs as payload
//     createCollection: (state, action) => {
//       state.push({ ...action.payload });
//     },
//     // Delete expects Collection ID as payload
//     deleteCollection: (state, action) => {
//       return state.filter((note) => action.payload !== note.id);
//     },
//     updateLabel: (state, action) => {
//       return state.map((collection) => {
//         if (collection.id == action.payload.id) {
//           console.log(action.payload.id, collection.id, action.payload.label);
//           return { ...collection, label: action.payload.label };
//         }
//         return collection;
//       });
//     },
//     // UpdateNotes expects updated/new array of Note IDs
//     // updateNotes: (state, action) => {
//     //   return state.map((collection) => {
//     //     if (collection.id == action.payload.id) {
//     //       return { ...collection, noteIDs: action.payload.noteIDs };
//     //     }
//     //     return collection;
//     //   });
//     // },
//   },
// });

// const selectCollections = (state: RootState) => state.collections;

// export const getCollectionIDs = createSelector(
//   [selectCollections],
//   (collections) => collections.map((collection) => ({ id: collection.id }))
// );

// export const {
//   createCollection,
//   deleteCollection,
//   updateLabel,
//   //  updateNotes
// } = collectionsSlice.actions;

// export default collectionsSlice.reducer;
