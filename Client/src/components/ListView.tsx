import { useDispatch, useSelector } from "react-redux";
import NoteView from "./NoteView";
// import { getNoteIDs } from "../state/notes/notesSlice";
// import { getCollectionIDs } from "../state/collections/collectionsSlice";
import CollectionView from "./CollectionView";
// import { ReactElement } from "react";
import {
  getCollections,
  getNotes,
  updateParent,
} from "../state/nodes/nodeSlice";
import { Node, Note } from "../interface";
import { createCollectionView, sortList } from "../utils/listHelper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { RootState } from "../state/store";
import { useEffect, useState } from "react";

interface dropID {
  id: string;
}

function ListView() {
  const collections = useSelector(getCollections);
  const notes = useSelector(getNotes);
  const rootExpandedState = useSelector(
    (state: RootState) => state.sidebarState.expandedView
  );
  const dispatch = useDispatch();
  const sortingMethod = useSelector(
    (state: RootState) => state.sidebarState.sortType
  );

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.NODE_ITEM,
    drop: (item: dropID) => {
      dispatch(updateParent({ id: item.id, parentID: null }));
    },
  }));

  const createListView = (
    collections: Array<Node>,
    notes: Array<Note | Node>,
    sortBy: string,
  ) => {
    const list: Array<Node | Note> = [];
    const newCol = sortList(collections, sortBy);
    newCol.forEach((col) => {
      if (!col.parentID) list.push(col);
    });
    const newNotes = sortList(notes, sortBy);
    newNotes.forEach((note) => {
      if (!note.parentID) list.push(note as Note);
    });
    return list;
  };

  const [list, setList] = useState(createListView(collections, notes, sortingMethod));

  useEffect(() => {
    setList(createListView(collections, notes, sortingMethod));
  }, [collections, notes, sortingMethod]);

  return (
    <div className="flex flex-col h-full flex-grow">
      {list.length > 0 ? (
        <>
          {list.map((element) => {
            if (element.type == "collection") {
              const childeren = createCollectionView(
                collections,
                notes,
                element.id,
                "z-a"
              );

              return (
                <CollectionView
                  collectionID={element.id}
                  key={element.id}
                  expand={rootExpandedState == "expanded" ? true : false}
                  childeren={childeren}
                  isChild={false}
                />
              );
            } else {
              return (
                <NoteView
                  noteID={element.id}
                  key={element.id}
                  isChild={false}
                />
              );
            }
          })}
          <div className="flex flex-col h-full flex-grow" ref={drop}></div>
        </>
      ) : (
        "Empty"
      )}
    </div>
  );
}

export default ListView;
