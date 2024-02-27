import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkValidEmail } from "../utils/authHelpers";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/user/userSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthContainer from "../components/auth/AuthContainer";

interface apiError {
  status: number;
  message: string;
}

function EmailSignup() {
  const [emailError, setEmailError] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  const [apiError, setApiError] = useState<apiError>({
    status: -1,
    message: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [credentialError, setCredentialError] = useState(new Array<number>());
  const dispatch = useDispatch();
  const email = location.state?.email || "";
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    checkValidEmail(e)
      .then(async (email) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?/&])[A-Za-z\d@$!%*?/&]{8,16}$/;
        setEmailError(false);
        const errorArr = [];
        if (e.target.firstName.value === "") {
          errorArr.push(0);
        }
        if (e.target.lastName.value === "") {
          errorArr.push(1);
        }
        if (!passwordRegex.test(e.target.password.value)) {
          errorArr.push(2);
        }

        if (errorArr.length == 0) {
          axios({
            method: "post",
            withCredentials: true,
            url: `${import.meta.env.VITE_BACKEND_AUTH_URL}/email/signup`,
            data: {
              firstName: e.target.firstName.value,
              lastName: e.target.lastName.value,
              email: email,
              password: e.target.password.value,
            },
          })
            .then((res) => {
              if (res.status == 200) {
                dispatch(
                  updateUser({
                    data: res.data,
                  }),
                );
                document.startViewTransition(() => navigate("/"));
              } else throw new Error("Something went wrong");
            })
            .catch((err: AxiosError) => {
              if (err.response) {
                setApiError(err.response?.data.error);
              } else if (err.request)
                alert("Something went wrong, Please try again after sometime");
            });
        }
        setCredentialError(errorArr);
      })
      .catch(() => {
        setEmailError(true);
      });
  };

  const toggleVisibility = () => {
    setPassVisibility(!passVisibility);
  };
  return (
    <AuthContainer title="Sign Up" backLink={true}>
      <form
        className="flex w-full flex-col items-center justify-center gap-4 pt-4"
        onSubmit={onSubmitHandler}
      >
        <label
          htmlFor="signup-firstName"
          className={`flex w-full flex-col gap-2 text-sm text-gray-500`}
        >
          First Name
          <input
            type="firstName"
            name="firstName"
            id="signup-firstName"
            className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${credentialError.includes(0) ? "border-2 border-red-700" : ""}`}
            autoComplete="given-name"
          />
          {credentialError.includes(0) ? (
            <p className="text-red-700 text-xs">First Name cannot be empty!</p>
          ) : (
            ""
          )}
        </label>
        <label
          htmlFor="signup-lastName"
          className={`flex w-full flex-col gap-2 text-sm text-gray-500`}
        >
          Last Name
          <input
            type="lastName"
            name="lastName"
            id="signup-lastName"
            className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${credentialError.includes(1) ? "border-2 border-red-700" : ""}`}
            autoComplete="family-name"
          />
          {credentialError.includes(1) ? (
            <p className="text-red-700 text-xs">Last Name cannot be empty!</p>
          ) : (
            ""
          )}
        </label>
        <label
          htmlFor="signup-email"
          className={`flex w-full flex-col gap-2 text-sm text-gray-500`}
        >
          Email
          <input
            type="email"
            name="email"
            defaultValue={email}
            id="signup-email"
            placeholder="Enter your email address..."
            className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${emailError ? "border-2 border-red-700" : ""}`}
            autoComplete="email"
          />
          {emailError ? (
            <p className="text-red-700 text-xs"> Invalid Email Address!</p>
          ) : (
            ""
          )}
        </label>
        <label
          htmlFor="signup-password"
          className={`flex w-full flex-col gap-2 text-sm text-gray-500`}
        >
          Password
          <div className="relative">
            <input
              type={passVisibility ? "text" : "password"}
              name="password"
              id="signup-password"
              placeholder="Enter your password..."
              className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${credentialError.includes(2) ? "border-2 border-red-700" : ""}`}
              autoComplete="new-password"
            />
            <div className="hover: cursor-pointer" onClick={toggleVisibility}>
              {passVisibility ? (
                <IoEyeOffOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl" />
              ) : (
                <IoEyeOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl" />
              )}
            </div>
          </div>
          {credentialError.includes(2) ? (
            <ol className="list-decimal list-inside text-red-700 text-xs">
              <li>Your password must: Be between 8 and 16 characters long.</li>
              <li>
                Contain at least one lowercase letter (a-z). Contain at least
              </li>
              <li>
                one uppercase letter (A-Z). Contain at least one number (0-9).
              </li>
              <li>
                Contain at least one special character (@, $, !, %, *, &, ?).
              </li>
            </ol>
          ) : (
            ""
          )}
        </label>
        {apiError.status > 0 ? (
          <p className="text-red-700 text-xs">{apiError.message}</p>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="p-2 w-full bg-black rounded-md text-white font-semibold active:bg-gray-700 transition-all"
        >
          Sign Up
        </button>
      </form>
    </AuthContainer>
  );
}

export default EmailSignup;
