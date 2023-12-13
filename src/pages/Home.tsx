// import React from 'react'

import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="flex gap-x-5 h-screen p-5 bg-zinc-50">
      <Sidebar/>
      <Main/>
    </div>
  );
}

export default Home;
