import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/user/userSlice";
import { useNavigate } from "react-router-dom";

function Github() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const code = window.location.search.slice(1).split("=")[1];
    if (code) {
      axios
        .request({
          method: "POST",
          withCredentials: true,
          url: `${import.meta.env.VITE_BACKEND_AUTH_URL}/github`,
          data: { code },
        })
        .then((res) => {
          dispatch(updateUser({ data: res.data }));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    }
  }, []);
  return null;
}

export default Github;
