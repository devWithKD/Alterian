import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineNoteAdd, MdOutlineSort } from "react-icons/md";
import { LuFolderPlus } from "react-icons/lu";
import { BiCollapseVertical, BiExpandVertical } from "react-icons/bi";
import useCreateNewNote from "../utils/useCreateNewNote";
import useCreateCollection from "../utils/useCreateCollection";
import ListView from "./ListView";
import { useDispatch } from "react-redux";
import { updateFocusedID } from "../state/sidebar/sidebarSlice";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const createNewNote = useCreateNewNote();
  const [newCollectionID, createCollection] = useCreateCollection();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateFocusedID(newCollectionID));
  }, [dispatch, newCollectionID]);
  return (
    <div
      className={`shadow-md ${
        open ? "cursor-default h-full " : "cursor-pointer h-fit"
      } rounded-lg bg-white`}
      onClick={() => {
        open ? null : setOpen(true);
      }}
    >
      {open ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-grow relative">
            <button
              className="flex absolute top-0 left-0 m-4 justify-center items-center w-fit"
              onClick={() => {
                open ? setOpen(false) : null;
              }}
            >
              <AiOutlineMenu size={22} />
            </button>
            <div className="flex flex-grow justify-center items-center">
              <button className="mx-2 my-4" onClick={createNewNote}>
                <MdOutlineNoteAdd size={22} />
              </button>
              <button className="mx-2 my-4" onClick={createCollection}>
                <LuFolderPlus size={22} />
              </button>
              <button className="mx-2 my-4">
                {" "}
                <MdOutlineSort size={22} />
              </button>
              <button className="mx-2 my-4">
                <BiExpandVertical size={18} />
              </button>
            </div>
          </div>

          <div className="w-72 flex-grow mx-4">
            <ListView />
          </div>
        </div>
      ) : (
        <button className="flex m-2 justify-center items-center">
          <AiOutlineMenu size={22} />
        </button>
      )}
    </div>
  );
}

export default Sidebar;
