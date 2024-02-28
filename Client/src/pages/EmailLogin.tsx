import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkValidEmail } from "../utils/authHelpers";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/user/userSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthContainer from "../components/auth/AuthContainer";

function EmailLogin() {
  const [emailError, setEmailError] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  const location = useLocation();
  const [credentialError, setCredentialError] = useState({
    error: false,
    type: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const toggleVisibility = () => {
    setPassVisibility(!passVisibility);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    checkValidEmail(e)
      .then(async (email) => {
        if (e.target.password.value === "") {
          const err = { error: true, type: "empty pass" };
          setCredentialError(err);
          setEmailError(false);
        } else {
          axios({
            method: "post",
            url: `${import.meta.env.VITE_BACKEND_AUTH_URL}/email/login`,
            withCredentials: true,
            data: {
              email: email,
              password: e.target.password.value,
            },
          })
            .then((res) => {
              if (res.status == 200) {
                dispatch(updateUser({ data: res.data }));
                document.startViewTransition(() => navigate("/"));
              } else throw new Error("Something went wrong");
            })
            .catch((err: AxiosError) => {
              console.log(err);
              if (
                err.response &&
                err.response.data.error.message == "Invalid Credentials"
              )
                setCredentialError({
                  error: true,
                  type: "invalid creds",
                });
              else if (err.request)
                alert("Something went wrong, Please try again.");
            });
        }
      })
      .catch(() => {
        setEmailError(true);
      });
  };

  return (
    <AuthContainer title="Log In" backLink={true}>
      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        onSubmit={onSubmitHandler}
      >
        <label
          htmlFor="login-email"
          className={`flex w-full flex-col gap-2 text-sm text-gray-500`}
        >
          Email
          <input
            type="email"
            name="email"
            defaultValue={email || ""}
            id="login-email"
            placeholder="Enter your email address..."
            className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${emailError || credentialError.type == "invalid creds" ? "border-2 border-red-700" : ""}`}
            autoComplete="email"
          />
        </label>
        <label
          htmlFor="login-password"
          className={`flex w-full flex-col gap-2 text-sm text-gray-500`}
        >
          Password
          <div className="relative">
            <input
              type={passVisibility ? "text" : "password"}
              name="password"
              id="login-password"
              placeholder="Enter your password..."
              className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${credentialError.error ? "border-2 border-red-700" : ""}`}
              autoComplete="password"
            />
            <div className="hover: cursor-pointer" onClick={toggleVisibility}>
              {passVisibility ? (
                <IoEyeOffOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl" />
              ) : (
                <IoEyeOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl" />
              )}
            </div>
          </div>
        </label>
        {emailError ? (
          <p className="text-red-700 text-xs">Please Enter Valid Email</p>
        ) : credentialError.error ? (
          credentialError.type == "invalid creds" ? (
            <p className="text-red-700 text-xs">
              Invalid Credentials, Please try again
            </p>
          ) : credentialError.type == "empty pass" ? (
            <p className="text-red-700 text-xs">Password Cannot Be Empty</p>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <button
          type="submit"
          className="p-2 w-full bg-black rounded-md text-white font-semibold active:bg-gray-700 transition-all"
        >
          Log In
        </button>
      </form>
    </AuthContainer>
  );
}

export default EmailLogin;
