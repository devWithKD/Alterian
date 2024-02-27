import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosFailuerCB, AxiosSuccessCB, ResponseError } from "../interface";
import { updateUser } from "../state/user/userSlice";
import axios from "axios";
import { checkValidEmail } from "../utils/authHelpers";
import AuthContainer from "../components/auth/AuthContainer";

function Login() {
  const [emailError, setEmailError] = useState(false);
  //  const checkEmail = (data:string)=>{
  //    axios({
  //      method: "post",
  //      url: `${import.meta.env.VITE_BACKEND_AUTH_URL}/check-email`,
  //      data: { email: email },
  //    })
  //      .then((res) => {
  //        if (res.status == 200)
  //        navigate("/email-login", { state: { email: email } });
  //      })
  //      .catch(() => navigate("/email-signup", { state: { email: email } }));
  //  }
  const loginWithGoogle = () => {
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_ROUTE,
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT,
      response_type: "code",
      include_granted_scopes: "true",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    const googleOAuthURL = `${
      import.meta.env.VITE_GOOGLE_OAUTH_URL
    }?${qs.toString()}`;

    window.location.assign(googleOAuthURL);
  };

  const loginWithGithub = () => {
    const options = {
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_ROUTE,
      scope: "user",
    };
    const qs = new URLSearchParams(options);

    const githubOAuthURL = `${
      import.meta.env.VITE_GITHUB_OAUTH_URL
    }?${qs.toString()}`;

    window.location.assign(githubOAuthURL);
  };

  const user = useSelector((state: RootState) => state.authorised_user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    checkValidEmail(e)
      .then((email) => {
        axios({
          method: "post",
          url: `${import.meta.env.VITE_BACKEND_AUTH_URL}/check-email`,
          data: { email: email },
        })
          .then((res) => {
            if (res.status == 200)
              document.startViewTransition(() =>
                navigate("/email-login", { state: { email: email } }),
              );
          })
          .catch(() =>
            document.startViewTransition(() =>
              navigate("/email-signup", { state: { email: email } }),
            ),
          );
      })
      .catch(() => setEmailError(true));
  };

  useEffect(() => {
    const setUser: AxiosSuccessCB = (res) => {
      if (res.status == 200) {
        dispatch(updateUser({ data: res.data }));
        document.startViewTransition(() => navigate("/"));
        return;
      }
    };
    const errorHandler: AxiosFailuerCB = async (err) => {
      const errorData = err.response?.data as ResponseError;
      console.log(errorData);
      if (errorData.error.message && errorData.error.message == "jwt expired") {
        console.log(errorData.error.message);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_AUTH_URL}/refresh-token`,
          {
            withCredentials: true,
          },
        );
        if (res.status === 200) {
          document.startViewTransition(() => navigate("/"));
          return;
        }
      }
    };
    if (!user) {
      axios
        .get(`${import.meta.env.VITE_ALTERIAN_API_V1}/userinfo`, {
          withCredentials: true,
        })
        .then(setUser)
        .catch(errorHandler);
    }
  }, []);

  return (
    <AuthContainer title="Welcome">
      <div className="w-full grid grid-cols-1 divide-y-2">
        <div className="flex flex-col mb-4 items-center justify-center gap-4">
          <button
            className="p-2 w-full flex gap-3 bg-white items-center outline outline-1 outline-gray-400 justify-center rounded-md font-semibold"
            onClick={loginWithGoogle}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
          <button
            className="p-2 w-full flex gap-3 bg-white items-center outline outline-1 outline-gray-400 justify-center rounded-md font-semibold"
            onClick={loginWithGithub}
          >
            <FaGithub size={20} />
            Continue with Github
          </button>
        </div>
        <form
          className="flex w-full flex-col items-center justify-center gap-4 pt-4"
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
              id="login-email"
              placeholder="Enter your email address..."
              className={`px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100 ${emailError ? "border-2 border-red-700" : ""}`}
              autoComplete="email"
            />
            {emailError ? (
              <p className="text-red-700 text-xs">Please Enter Valid Email</p>
            ) : (
              ""
            )}
          </label>
          <button
            type="submit"
            className="p-2 w-full bg-black rounded-md text-white font-semibold active:bg-gray-700 transition-all"
          >
            Continue with email
          </button>
        </form>
      </div>
    </AuthContainer>
  );
}

export default Login;
