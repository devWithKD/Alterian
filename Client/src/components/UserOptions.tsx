import { FiUser } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserOptions() {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .get("/auth/logout")
      .then((response) => {
        if (response.status == 200) {
          console.log("Loged Out Successfully!");
          navigate("/login");
        } else {
          throw new Error("Something went wrong!, Please Try again.");
        }
      })
      .catch((err) => {
        console.log(err);
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
