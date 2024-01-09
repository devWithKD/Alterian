import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect, useRef, useState } from "react";
// import { updateLabel } from "../state/collections/collectionsSlice";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
// import { updateParent } from "../state/notes/notesSlice";
import { updateFocusedID } from "../state/sidebar/sidebarSlice";
import {
  getCollections,
  getNotes,
  updateParent,
  updateTitle,
} from "../state/nodes/nodeSlice";
import { Node, Note } from "../interface";
import NoteView from "./NoteView";
import { createCollectionView } from "../utils/listHelper";
import React from "react";

interface props {
  collectionID: string;
  expand: boolean;
  childeren: Array<Node | Note>;
  isChild: boolean;
}
interface dropID {
  id: string;
}

function CollectionView(props: props) {
  const [isExpanded, SetExpanded] = useState(props.expand);
  const collections = useSelector(getCollections);
  const notes = useSelector(getNotes);
  // const rootExpandedState = useSelector(
  //   (state: RootState) => state.sidebarState.expandedView
  // );

  const title = useSelector((state: RootState) => {
    return state.nodes.filter(
      (collection) => collection.id === props.collectionID
    )[0].title;
  });
  const focusedID = useSelector(
    (state: RootState) => state.sidebarState.focusedID
  );

  const dispatch = useDispatch();

  const [isEditable, setEditable] = useState(false);

  const [, drag] = useDrag(() => ({
    type: ItemTypes.NODE_ITEM,
    item: { id: props.collectionID },
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.NODE_ITEM,
    drop: (item: dropID) => {
      dispatch(updateParent({ id: item.id, parentID: props.collectionID }));
    },
  }));

  const updateTitleText = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    // console.log(e.target.innerText, props.collectionID);
    e.target.blur();
    dispatch(
      updateTitle({ id: props.collectionID, title: e.target.innerText })
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.detail == 2 && e.target == titleRef.current) {
      dispatch(updateFocusedID(props.collectionID));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isEditable) {
      e.preventDefault();
      // console.log("pressed enter");
      titleRef.current?.blur();
    }
  };
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bool = props.collectionID === focusedID;
    setEditable(bool);
  }, [focusedID, props.collectionID]);

  useEffect(() => {
    if (focusedID === props.collectionID && titleRef.current) {
      titleRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  });
  useEffect(() => {
    SetExpanded(props.expand);
  }, [props.expand]);

  // console.log(props.childerenIDs);

  return (
    <div
      ref={drag}
      className={`flex flex-col mb-1 ${
        props.isChild ? "me-2" : ""
      } flex-grow rounded ${
        isExpanded ? "outline outline-1 outline-slate-200" : ""
      }`}
    >
      <div
        className={`py-1 ps-2 ${
          isEditable ? "outline outline-2" : ""
        } rounded flex flex-col gap-2 hover:bg-slate-200 `}
        onBlur={() => {
          dispatch(updateFocusedID(null));
          const sel = window.getSelection();
          sel?.removeAllRanges();
        }}
        ref={drop}
      >
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              SetExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <FaAngleDown size={16} />
            ) : (
              <FaAngleRight size={16} />
            )}
          </button>
          <div
            className="focus:outline-none"
            contentEditable={isEditable}
            onClick={(e) => handleClick(e)}
            ref={titleRef}
            onKeyDown={(e) => handleKeyPress(e)}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              // console.log("blur");
              dispatch(updateFocusedID(null));
              const sel = window.getSelection();
              sel?.removeAllRanges();
              // setEditable(false);
              updateTitleText(e);
            }}
          >
            {title}
          </div>
        </div>
      </div>
      {isExpanded ? (
        <div className="flex">
          <div className="grid grid-cols-2 divide-x divide-gray-400">
            <div className="mx-1 ps-1"></div>
            <div className="mx-1"></div>
          </div>
          <div className="flex flex-grow flex-col">
            {props.childeren.map((element) => {
              if (element.type == "collection") {
                const childeren = createCollectionView(
                  collections,
                  notes,
                  element.id,
                  "z-a"
                );
                return (
                  <CollectionView
                    childeren={childeren}
                    collectionID={element.id}
                    expand={props.expand}
                    key={element.id}
                    isChild={true}
                  />
                );
              }
              if (element.type == "note") {
                return (
                  <NoteView
                    noteID={element.id}
                    key={element.id}
                    isChild={true}
                  />
                );
              }
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const CollectionViewMemoized = React.memo(CollectionView);

export default CollectionViewMemoized;
