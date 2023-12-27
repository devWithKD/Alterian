import { updateNoteTitle } from "../state/notes/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

function NoteTitle() {
  const selectedID = useSelector((state: RootState) => state.currentNote.id);
  const title = useSelector(
    (state: RootState) =>
      state.notes.filter((note) => note.id === selectedID)[0].title
  );
  const dispatch = useDispatch();

  const onChange = (val: string) => {
    updateTitle(val);
  };
  const updateTitle = (val: string) => {
    dispatch(
      updateNoteTitle({
        id: selectedID,
        title: val,
      })
    );
  };
  return (
    <input
      type="text"
      className="text-5xl bg-inherit font-extrabold focus:outline-none mb-4"
      onBlur={(e) => {
        onChange(e.target.value);
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={title}
    />
  );
}

export default NoteTitle;
