import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
// import { Note } from "../interface";
// import { createNote } from "../state/notes/notesSlice";
import { setCurrentNote } from "../state/currentNote/currentNoteSlice";
import { createNote } from "../state/nodes/nodeSlice";

const useCreateNewNote = () => {
  const dispatch = useDispatch();
  return () => {
    const id = uuidV4();

    dispatch(createNote({id}));
    dispatch(setCurrentNote({ id }));
  };
};

export default useCreateNewNote;
