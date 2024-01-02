import { useSelector } from "react-redux";
import NoteView from "./NoteView";
import { getNoteIDs } from "../state/notes/notesSlice";
import { getCollectionIDs } from "../state/collections/collectionsSlice";
import CollectionView from "./CollectionView";
import { ReactElement } from "react";
import { RootState } from "../state/store";

function ListView() {
  const rawNoteIDs = useSelector(getNoteIDs);
  const rawCollectionIDs = useSelector(getCollectionIDs);
  const focusID = useSelector((state:RootState)=>state.sidebarState.focusedID)

  const List: Array<ReactElement> = [];

  // class listElement {
  //   id: string
  //   timeStamp : EpochTimeStamp
  //   type: string
  //   childeren: Array<string> | null
  //   constructor(props){
  //     this.id = props.id
  //     this.timeStamp = props.timeStamp
  //     this.type = props.type
  //     this.childeren = props.childeren
  //   }
  // }
  const createListView = (
    noteIDs: typeof rawNoteIDs,
    collectionIDs: typeof rawCollectionIDs
  ) => {
    if (noteIDs.length == 0 && collectionIDs.length == 0) {
      return;
    } else {
      if (noteIDs.length > 0)
        noteIDs.map((noteID) =>
          List.push(
            <NoteView
              noteID={noteID.id}
              key={noteID.id}
            />
          )
        );
      if (collectionIDs.length > 0) {
        collectionIDs.map((id) => {
          List.push(
            <CollectionView
              collectionID={id.id}
              key={id.id}
              expand={false}
              childerenIDs={[]}
            />
          );
        });
      }
    }
  };

  createListView(rawNoteIDs, rawCollectionIDs);

  return (
    <div>{List.length > 0 ? List.map((element) => element) : "Empty"}</div>
  );
}

export default ListView;
