import useCreateNewNote from "../react-hooks/useCreateNewNote";

function NoteCreator() {
  const createNote = useCreateNewNote();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-10">Welcome!</h1>
      <p className="text-xl mb-5 text-center">
        Alterian is a humble try of providing a similar note Taking experience
        to that of Obsidian
      </p>
      <button onClick={createNote} className="text-blue-700 underline text-xl">
        Create a note!
      </button>
    </div>
  );
}

export default NoteCreator;
