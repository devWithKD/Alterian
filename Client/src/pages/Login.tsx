import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

function Login() {
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

  return (
    <div className="w-screen h-screen bg-zinc-50 flex items-center justify-center">
      <div className="p-7 w-96 bg-white shadow-lg rounded-md grid grid-cols-1 divide-y-2">
        <div className="flex flex-col my-4 items-center justify-center gap-4">
          <h1 className="text-6xl mb-6 font-black text-center ">Log In</h1>
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
        <form className="flex w-full flex-col items-center justify-center gap-4 pt-4">
          <label
            htmlFor="login-email"
            className="flex w-full flex-col gap-2 text-sm text-gray-500"
          >
            Email
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Enter your email address..."
              className="px-2 py-1 block w-full h-8 outline outline-1 outline-gray-300 rounded bg-gray-100"
              autoComplete="email"
            />
          </label>
          <button
            type="submit"
            className="p-2 w-full bg-black rounded-md text-white font-semibold"
          >
            Continue with email
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
