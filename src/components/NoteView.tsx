import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useRef, useState } from "react";
// import { updateNoteTitle } from "../state/notes/notesSlice";
import { setCurrentNote } from "../state/currentNote/currentNoteSlice";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { updateTitle } from "../state/nodes/nodeSlice";
import React from "react";

interface props {
  noteID: string;
  isChild: boolean;
}

function NoteView(props: props) {
  console.log(props.noteID);

  const title = useSelector((state: RootState) => {
    return state.nodes.filter((node) => node.id === props.noteID)[0].title;
  });
  const dispatch = useDispatch();
  const [isEditable, setEditable] = useState(false);

  const updateNoteTitle = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    // dispatch(updateNoteTitle({ id: props.noteID, title: e.target.innerText }));
    dispatch(updateTitle({ id: props.noteID, title: e.target.innerText }));
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
    type: ItemTypes.NODE_ITEM,
    item: { id: props.noteID },
  }));

  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={drag}>
      <div
        className={`py-1 ${!props.isChild ? "ps-8" : "px-4"}  ${
          isEditable ? "outline outline-2" : ""
        } rounded hover:bg-slate-200`}
        contentEditable={isEditable}
        onBlur={(e) => {
          // console.log("blur");
          setEditable(false);
          updateNoteTitle(e);
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

const NoteViewMemoized = React.memo(NoteView)

export default NoteViewMemoized;
