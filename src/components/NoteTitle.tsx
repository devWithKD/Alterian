import { useState } from "react";
import { Note } from "../interface";
import { updateNoteTitle } from "../state/notes/notesSlice";
import { useDispatch } from "react-redux";

interface props {
  note: Note;
  id: string;
  onBlur: ()=>void
  onClick: ()=>void
}

function NoteTitle(props: props) {
  const [title, setTitle] = useState(props.note.title);
  const dispatch = useDispatch();

  const onChange = (val: string) => {
    setTitle(val);
    updateTitle(val);
  };
  const updateTitle = (val: string) => {
    dispatch(
      updateNoteTitle({
        id: props.id,
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
        props.onBlur();
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onClick={props.onClick}
      defaultValue={title}
    />
  );
}

export default NoteTitle;
