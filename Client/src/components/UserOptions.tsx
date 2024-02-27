import { FiUser } from "react-icons/fi";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function UserOptions() {
  const navigate = useNavigate();
  const logout = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: `${import.meta.env.VITE_BACKEND_AUTH_URL}/logout`,
    })
      .then((res) => {
        if (res.status == 200) {
          console.log("Logged Out Successfully");
          document.startViewTransition(() => navigate("/login"));
        } else throw new Error("Something Went Wrong, Please Try again");
      })
      .catch((err: AxiosError) => {
        alert(err.message);
      });
  };
  return (
    <div className="flex shadow-md rounded-lg bg-white">
      <button className="m-2" onClick={logout}>
        <FiUser size={22} />
      </button>
    </div>
  );
}

export default UserOptions;
