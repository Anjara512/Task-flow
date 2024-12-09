import clsx from "clsx";
import React from "react";
import { useProps } from "./contextApi";

import {
  Notebook,
  CalendarDays,
  Calendar1,
  LogOut,
  GalleryHorizontal,
  Settings,
  SquareBottomDashedScissors,
  Folder,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
  source: string | undefined;
  lien: string;
  logout: () => void;
}

const Nav = ({ source, lien, logout }: Props) => {
  const { themes } = useProps();
  return (
    <nav className={clsx("h-screen w-1/4 bg-zinc-900 gap-3 flex flex-col ")}>
      <header className="flex flex-row gap-2 ">
        {/* <img src={source} alt="" className="rounded-full w-40 h-40"></img>
         */}
        <p
          className={clsx("text-white text-2xl ", {
            "text-zinc-900": themes !== "dark",
          })}
        >
          {source}
        </p>
      </header>

      <div className="flex flex-col ">
        <h1 className={clsx("capitalize  text-2xl text-zinc-100 ")}>Tasks</h1>
        <NavLink
          to={"/Mydays"}
          className={clsx(
            " px-5 gap-2 flex hover:bg-zinc-800 cursor-pointer flex-row h-10 text-white font-sans text-xl"
          )}
        >
          <Calendar1 />
          Mydays
        </NavLink>
        <p
          className={clsx(
            " px-5 gap-2 flex  hover:bg-zinc-800  cursor-pointer flex-row h-10 text-white font-sans text-xl"
          )}
        >
          <CalendarDays /> last week
        </p>
        <NavLink
          to={lien}
          className={clsx(
            " px-5 gap-2 flex  hover:bg-zinc-800  flex-row cursor-pointer h-10 text-white font-sans text-xl"
          )}
        >
          <Folder /> All..
        </NavLink>
      </div>
      <hr></hr>
      <div className="flex flex-col ">
        <h1 className={clsx("capitalize  text-2xl text-zinc-100 ")}>Notes</h1>
        <p
          className={clsx(
            " px-5 gap-2  hover:bg-zinc-800  flex cursor-pointer flex-row h-10 text-white font-sans text-xl"
          )}
        >
          <GalleryHorizontal />
          multimedia
        </p>
        <p
          className={clsx(
            " px-5 gap-2  hover:bg-zinc-800  flex cursor-pointer flex-row h-10 text-white font-sans text-xl"
          )}
        >
          <Notebook /> Notes
        </p>
      </div>
      <hr></hr>

      <div className="flex flex-col ">
        <h1 className={clsx("capitalize  text-2xl text-zinc-100 ")}>Other</h1>
        <p
          className={clsx(
            " px-5 gap-2  hover:bg-zinc-800  flex cursor-pointer flex-row h-10 text-white font-sans text-xl"
          )}
        >
          <Settings />
          paramétres
        </p>
        <p
          onClick={logout}
          className={clsx(
            " px-5 gap-2  hover:bg-zinc-800  flex cursor-pointer flex-row h-10 text-white font-sans text-xl"
          )}
        >
          <LogOut /> deconnexion
        </p>
      </div>

      <main className="flex h-screen "></main>
    </nav>
  );
};

export default Nav;
