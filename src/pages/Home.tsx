// import React from 'react'

import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-x-5 h-screen p-5 bg-zinc-50">
        <Sidebar />
        <Main />
      </div>
    </DndProvider>
  );
}

export default Home;
