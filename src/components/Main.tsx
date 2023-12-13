import Navbar from "./Navbar";
import Editor from "./Editor";

function Main() {
  return (
    <div className="w-full flex gap-4 flex-col">
      <Navbar />
      <Editor />
    </div>
  );
}

export default Main;
