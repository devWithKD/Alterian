import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  backLink: boolean | undefined;
}

function AuthContainer(props: Partial<AuthContainerProps>) {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-zinc-50 flex items-center justify-center">
      <div className="relative p-7 w-96 bg-white shadow-lg rounded-md">
        {props.backLink ? (
          <div
            className="flex gap-2 text-zinc-300 hover:text-zinc-400  justify-center items-center absolute -left-24 top-1 transition-all hover:cursor-pointer"
            onClick={() => {
              document.startViewTransition(() => navigate("/login"));
            }}
          >
            <p className="italic text-xl ">Back</p>
            <IoArrowBack className="text-2xl" />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col mt-8 mb-2 items-center justify-center gap-4">
          <h1 className="text-6xl mb-6 font-black text-center ">
            {props.title}
          </h1>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
