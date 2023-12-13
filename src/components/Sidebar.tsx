import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
function Sidebar() {
  const [open, setOpen] = useState(false);
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
        <div className="flex flex-col gap-4">
          <button
            className="flex m-2 justify-center items-center w-fit"
            onClick={() => {
              open ? setOpen(false) : null;
            }}
          >
            <AiOutlineMenu size={22} />
          </button>
          <div className="w-56 flex-grow">Hello</div>
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
