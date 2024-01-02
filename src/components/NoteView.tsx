import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useRef, useState } from "react";
import { updateNoteTitle } from "../state/notes/notesSlice";
import { setCurrentNote } from "../state/currentNote/currentNoteSlice";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";

interface props {
  noteID: string;
}

function NoteView(props: props) {
  const title = useSelector((state: RootState) => {
    return state.notes.filter((note) => note.id === props.noteID)[0].title;
  });
  const dispatch = useDispatch();
  const [isEditable, setEditable] = useState(false);

  const updateTitle = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    dispatch(updateNoteTitle({ id: props.noteID, title: e.target.innerText }));
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.detail == 2) {
      setEditable(true);
      titleRef.current?.focus();
    } else if (e.detail == 1) {
      dispatch(setCurrentNote({ id: props.noteID }));
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log("pressed enter");
      e.currentTarget.blur();
    }
  };

  const [, drag] = useDrag(() => ({
    type: ItemTypes.NOTE_ITEM,
    item: { id: props.noteID },
  }));

  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={drag}>
      <div
        className={`py-1 ps-8 ${
          isEditable ? "outline outline-2" : ""
        } rounded hover:bg-slate-200`}
        contentEditable={isEditable}
        onBlur={(e) => {
          // console.log("blur");
          setEditable(false);
          updateTitle(e);
        }}
        onClick={(e) => handleClick(e)}
        ref={titleRef}
        onKeyDown={(e) => handleKeyPress(e)}
        suppressContentEditableWarning={true}
      >
        {title}
      </div>
    </div>
  );
}

export default NoteView;
