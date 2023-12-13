import UserOptions from "./UserOptions";
import SearchMenu from "./SearchMenu";

function Navbar() {
  return (
    <div className="flex justify-between items-start w-full">
      <SearchMenu />
      <UserOptions />
    </div>
  );
}

export default Navbar;
