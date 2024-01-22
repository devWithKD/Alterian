// import React from 'react'

import { useDispatch } from "react-redux";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { updateUser } from "../state/user/userSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_ALTERIAN_API_V1}/userinfo`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          // console.log(res)
          dispatch(updateUser({ data: res.data }));
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);
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
