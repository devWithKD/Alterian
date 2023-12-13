import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import NoteTitle from "./NoteTitle";
import MarkDownEditor from "./MarkDownEditor";
// import { useState } from "react";
// import { Tab } from "../interface";

function NoteEditor() {
  const selectedNoteID = useSelector(
    (state: RootState) => state.currentNote.id
  );
  const note = useSelector((state: RootState) => {
    const noteArr = state.notes.filter((note) => note.id === selectedNoteID);
    return noteArr[0];
  });

  // const [openTabs, setOpenTabs] = useState(() => {
  //   const TabArray: Array<Tab> = [{ id: selectedNoteID, label: note.title }];
  //   return TabArray;
  // });
  return (
    <div className="h-100 flex flex-col w-4/5 xl:w-3/5 ">
      {/* <TabBar /> */}
      <NoteTitle
        note={note}
        id={selectedNoteID}
        onBlur={() => {
          // setEditingNotedetails(false);
        }}
        onClick={() => {
          // setEditingNotedetails(true);
        }}
      />
      <MarkDownEditor/>
    </div>
  );
}

export default NoteEditor;
