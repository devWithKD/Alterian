// import { updateNoteTitle } from "../state/notes/notesSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { updateTitle } from "../state/nodes/nodeSlice";

function NoteTitle() {
  const selectedID = useSelector((state: RootState) => state.currentNote.id);
  const title = useSelector(
    (state: RootState) =>
      state.nodes.filter((node) => node.id === selectedID)[0].title
  );
  const dispatch = useDispatch();
  const updateNoteTitle = (val: string) => {
    dispatch(
      updateTitle({
        id: selectedID,
        title: val,
      })
    );
  };
  const onChange = (val: string) => {
    updateNoteTitle(val);
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
