import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useProps } from "./contextApi";
import { Moon, Sun } from "lucide-react";
import cn from "./utils";

export default function Head() {
  const { themes, toogleTheme } = useProps();

  return (
    <header
      className={cn(
        "bg-zinc-800 sticky top-0 flex flex-row justify-between p-2 ",
        {
          "bg-zinc-200": themes === "light",
        }
      )}
    >
      <h1 className=" md:text-3xl uppercase text-transparent bg-clip-text font-bold bg-gradient-to-r from-sky-500 to-pink-500 ">
        Task flow
      </h1>
      <div className="flex flex-row gap-4 ">
        {themes === "dark" ? (
          <Sun
            onClick={toogleTheme}
            className="text-2xl text-yellow-700 cursor-pointer"
          />
        ) : (
          <Moon
            onClick={toogleTheme}
            className="text-2xl text-yellow-700 cursor-pointer"
          />
        )}
        <FaGithub
          className={cn("text-2xl text-white cursor-pointer", {
            "text-zinc-800": themes === "light",
          })}
        ></FaGithub>
        <FaLinkedin className="text-2xl text-blue-500 cursor-pointer" />
      </div>
    </header>
  );
}
