import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineNoteAdd, MdOutlineSort } from "react-icons/md";
import { LuFolderPlus } from "react-icons/lu";
import { BiCollapseVertical, BiExpandVertical } from "react-icons/bi";
import useCreateNewNote from "../utils/useCreateNewNote";
import useCreateCollection from "../utils/useCreateCollection";
import ListView from "./ListView";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExpandedView,
  updateFocusedID,
  updateSortType,
} from "../state/sidebar/sidebarSlice";
import { RootState } from "../state/store";

function Sidebar() {
  const [sortOpsView, setSortOpsView] = useState(false);
  const [open, setOpen] = useState(false);
  const createNewNote = useCreateNewNote();
  const [newCollectionID, createCollection] = useCreateCollection();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateFocusedID(newCollectionID));
  }, [dispatch, newCollectionID]);
  const rootExpandedState = useSelector(
    (state: RootState) => state.sidebarState.expandedView
  );

  const sortDropDownRef = useRef<HTMLDivElement>(null);
  const sortBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortBtnRef.current?.contains(e.target as Node)) {
        return;
      }
      if (sortOpsView && !sortDropDownRef.current?.contains(e.target as Node)) {
        setSortOpsView(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      className={`shadow-md ${
        open ? "cursor-default h-full " : "cursor-pointer h-fit"
      } rounded-lg bg-white z-50`}
      onClick={() => {
        open ? null : setOpen(true);
      }}
    >
      {open ? (
        <div className="flex relative flex-col flex-grow h-full gap-2">
          <div className="flex">
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
              <div className="relative">
                <button
                  className="mx-2 my-4"
                  onClick={() => {
                    sortOpsView ? setSortOpsView(false) : setSortOpsView(true);
                  }}
                  ref={sortBtnRef}
                >
                  <MdOutlineSort size={22} />
                </button>
                {sortOpsView ? (
                  <div className="left-2 w-64 absolute -bottom-44 bg-slate-100 text-sm rounded border border-slate-400">
                    <div
                      className="grid grid-cols-1 divide-y divide-slate-400"
                      ref={sortDropDownRef}
                    >
                      <div className="flex flex-col gap-1">
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                          onClick={() => {
                            console.log("a-z");
                            dispatch(updateSortType("a-z"));
                          }}
                        >
                          <div>File Name (A to Z)</div>
                        </button>
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                          onClick={() => {
                            console.log("z-a");
                            dispatch(updateSortType("z-a"));
                          }}
                        >
                          <div>File Name (Z to A)</div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                          onClick={() => {
                            console.log("modified newest first");
                            dispatch(updateSortType("modified newest first"));
                          }}
                        >
                          <div>Modified Time (Newest to Oldest)</div>
                        </button>
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                          onClick={() => {
                            console.log("modified oldest first");

                            dispatch(updateSortType("modified oldest first"));
                          }}
                        >
                          <div> Modified Time (Oldest to Newest)</div>
                        </button>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                          onClick={() => {
                            console.log("created newest first");

                            dispatch(updateSortType("created newest first"));
                          }}
                        >
                          <div>Created Time (Newest to Oldest)</div>
                        </button>
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                          onClick={() => {
                            console.log("created oldest first");

                            dispatch(updateSortType("created oldest first"));
                          }}
                        >
                          <div>Created Time (Oldest to Newest)</div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* <div
                  className={`${
                    sortOpsView ? "block" : "hidden"
                  } left-2 w-64 absolute -bottom-44 bg-slate-100 text-sm rounded border border-slate-400`}
                >
                  <div
                    className="grid grid-cols-1 divide-y divide-slate-400"
                    ref={sortDropDownRef}
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                        onClick={() => {
                          console.log("a-z");
                          dispatch(updateSortType("a-z"));
                        }}
                      >
                        <div>File Name (A to Z)</div>
                      </button>
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                        onClick={() => {
                          console.log("z-a");
                          dispatch(updateSortType("z-a"));
                        }}
                      >
                        <div>File Name (Z to A)</div>
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                        onClick={() => {
                          console.log("modified newest first");
                          dispatch(updateSortType("modified newest first"));
                        }}
                      >
                        <div>Modified Time (Newest to Oldest)</div>
                      </button>
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                        onClick={() => {
                          console.log("modified oldest first");

                          dispatch(updateSortType("modified oldest first"));
                        }}
                      >
                        <div> Modified Time (Oldest to Newest)</div>
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                        onClick={() => {
                          console.log("created newest first");

                          dispatch(updateSortType("created newest first"));
                        }}
                      >
                        <div>Created Time (Newest to Oldest)</div>
                      </button>
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-slate-300"
                        onClick={() => {
                          console.log("created oldest first");

                          dispatch(updateSortType("created oldest first"));
                        }}
                      >
                        <div>Created Time (Oldest to Newest)</div>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>

              <button
                className="mx-2 my-4"
                onClick={() => {
                  if (rootExpandedState !== "expanded") {
                    dispatch(updateExpandedView("expanded"));
                  } else {
                    dispatch(updateExpandedView("collapsed"));
                  }
                }}
              >
                {rootExpandedState !== "expanded" ? (
                  <BiExpandVertical size={18} />
                ) : (
                  <BiCollapseVertical size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="w-72 flex-grow h-full mx-4">
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
