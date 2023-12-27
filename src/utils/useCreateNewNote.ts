import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { Note } from "../interface";
import { createNote } from "../state/notes/notesSlice";
import { setCurrentNote } from "../state/currentNote/currentNoteSlice";

const useCreateNewNote = () => {
  const dispatch = useDispatch();
  return () => {
    const id = uuidV4();
    const note: Note = {
      title: "Untitled",
      id,
      body: "",
      tagIDs: [],
      parentID: "",
    };
    dispatch(createNote(note));
    dispatch(setCurrentNote({ id }));
  };
};

export default useCreateNewNote;
