// import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { updateUser } from "../state/user/userSlice";
import { RootState } from "../state/store";
import { ResponseError } from "../interface";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authorised_user.data);

  useEffect(() => {
    if (!user) {
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
        .catch((err: AxiosError) => {
          const errorData = err.response?.data as ResponseError;
          console.log(errorData);
          if (
            errorData.error.message &&
            errorData.error.message == "jwt expired"
          ) {
            console.log(errorData.error.message);
            axios
              .get(`${import.meta.env.VITE_BACKEND_AUTH_URL}/refresh-token`, {
                withCredentials: true,
              })
              .then((res) => {
                if (res.status !== 200) {
                  navigate("/login");
                  return;
                }
                navigate("/");
              })
              .catch((err) => {
                console.log(err.message);
                navigate("/login");
              });
          } else {
            navigate("/login");
          }
        });
    }
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
