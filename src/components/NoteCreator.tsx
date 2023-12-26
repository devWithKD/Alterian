import { Note } from "../interface";
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { createNoteWithID } from "../state/notes/notesSlice";
import { setCurrentNote } from "../state/currentNote/currentNoteSlice";

function NoteCreator() {
  const dispatch = useDispatch();
  const createNote = () => {
    const id = uuidV4();

    const note: Note = {
      title: "Untitled",
      id,
      body: "",
      tagIDs: [],
      parentID: "",
    };
    dispatch(createNoteWithID(note));
    dispatch(setCurrentNote({ id }));
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-10">Welcome!</h1>
      <p className="text-xl mb-5">
        Alterian is a humble try of providing a similar note Taking
        experience to that of Obsidian
      </p>
      <button onClick={createNote} className="text-blue-700 underline text-xl">
        Create a note!
      </button>
    </div>
  );
}

export default NoteCreator;
