import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

function SearchMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`shadow-md h-fit ${
        open ? "cursor-default" : "cursor-pointer"
      } rounded-lg bg-white`}
      onClick={() => {
        open ? null : setOpen(true);
      }}
      onBlur={() => {
        setOpen(false);
      }}
    >
      {open ? (
        <div className="flex items-center">
          <input
            className="my-1 mx-2 focus:outline-none"
            type="text"
            placeholder="Search.."
            autoFocus
          />
          <button
            className="m-2"
            onClick={() => {
              open ? setOpen(false) : null;
            }}
          >
            <MdOutlineSearch size={22} />
          </button>
        </div>
      ) : (
        <button className="m-2">
          <MdOutlineSearch size={22} />
        </button>
      )}
    </div>
  );
}

export default SearchMenu;
