import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import NoteCreator from "./NoteCreator";
import NoteEditor from "./NoteEditor";

function Editor() {
  const currentNote = useSelector((state: RootState) => state.currentNote);
  return (
    <div className="w-full h-full flex justify-center -translate-x-9">
      {currentNote.id === "" ? <NoteCreator /> : <NoteEditor />}
    </div>
  );
}

export default Editor;
