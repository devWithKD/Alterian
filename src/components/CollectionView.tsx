import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect, useRef, useState } from "react";
import { updateLabel } from "../state/collections/collectionsSlice";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { updateParent } from "../state/notes/notesSlice";
import { updateFocusedID } from "../state/sidebar/sidebarSlice";

interface props {
  collectionID: string;
  expand: boolean;
  childerenIDs: Array<string>;
}
interface noteItem {
  id: string;
}

function CollectionView(props: props) {
  const [isExpanded, SetExpanded] = useState(props.expand);
  
  const title = useSelector((state: RootState) => {
    return state.collections.filter(
      (collection) => collection.id === props.collectionID
    )[0].label;
  });
  const focusedID = useSelector(
    (state: RootState) => state.sidebarState.focusedID
  );

  const dispatch = useDispatch();

  const [isEditable, setEditable] = useState(false);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.NOTE_ITEM,
    drop: (item: noteItem) => {
      dispatch(updateParent({ id: item.id, parentID: props.collectionID }));
    },
  }));

  const updateLabelText = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    console.log(e.target.innerText, props.collectionID);
    dispatch(
      updateLabel({ id: props.collectionID, label: e.target.innerText })
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.detail == 2) {
      setEditable(true);
      titleRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isEditable) {
      e.preventDefault();
      // console.log("pressed enter");
      e.currentTarget.blur();
    }
  };
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditable(props.collectionID === focusedID);
  }, [focusedID, props.collectionID]);

  return (
    <div
      className={`py-1 ps-2 ${
        isEditable ? "outline outline-2" : ""
      } rounded flex flex-col gap-2 hover:bg-slate-200 `}
      ref={drop}
      onBlur={(e) => {
        // console.log("blur");
        dispatch(updateFocusedID(null));
        setEditable(false);
        updateLabelText(e);
      }}
    >
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            SetExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <FaAngleDown size={16} /> : <FaAngleRight size={16} />}
        </button>
        <div
          className="focus:outline-none"
          contentEditable={isEditable}
          onClick={(e) => handleClick(e)}
          ref={titleRef}
          onKeyDown={(e) => handleKeyPress(e)}
          suppressContentEditableWarning={true}
        >
          {title}
        </div>
      </div>
      {isExpanded ? <div className="flex flex-col gap-2"></div> : null}
    </div>
  );
}

export default CollectionView;
