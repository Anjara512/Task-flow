import { NavLink, useNavigate } from "react-router-dom";
import Head from "./Header";

import { FaKey } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { useProps } from "./contextApi";
import axios from "axios";
import cn from "./utils";
export default function Homepage() {
  let { themes, userData } = useProps();

  let nav = useNavigate();
  const Tologin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    let fin = {
      password: password,
      email: email,
    };

    try {
      const response = await axios.post("http://localhost:5000", fin);
      userData.push(response.data.user);
      localStorage.setItem("token", response.data.token);
      nav("/UserProfil");
    } catch (error) {
      console.error(error);
      alert("email ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex flex-col ">
      <Head></Head>
      <main className="flex flex-row gap-1 ">
        <div
          className={cn("h-screen bg-zinc-600 w-3/4", {
            "bg-zinc-200": themes === "light",
          })}
        ></div>
        <div
          className={cn("h-screen bg-zinc-800 w-1/3 flex  justify-center", {
            "bg-zinc-300": themes === "light",
          })}
        >
          <form
            onSubmit={Tologin}
            className={cn(
              "bg-zinc-600 flex flex-col gap-4 p-4  rounded-md w-max h-max mt-10  ",
              { "bg-neutral-100": themes === "light" }
            )}
          >
            <div className="flex flex-row relative w-max p-1 gap-2 rounded-md bg-zinc-900 ">
              <IoMail className=" mt-3 text-white"></IoMail>

              <input
                className=" bg-zinc-900 rounded-md w-52 h-10 p-4 text-white focus:outline-lime-500  "
                type="email"
                placeholder="Adresse email"
                name="email"
                id=""
              />
            </div>
            <div className="flex flex-row relative w-max p-1 gap-2 rounded-md bg-zinc-900 ">
              <FaKey className=" mt-3 text-white"></FaKey>

              <input
                className=" bg-zinc-900 rounded-md w-52 p-4 text-white h-10 focus:outline-lime-500 "
                type="password"
                placeholder="Password..."
                name="password"
                id=""
              />
            </div>
            <button className=" rounded-md mx-3 my-2 w-max h-max p-1  bg-blue-950 ring-1  hover:ring-4 ring-offset-1 text-2xl text-white">
              connexion{" "}
            </button>
            ou
            <NavLink className={cn("text-blue-900")} to={"/createUser"}>
              create a new account
            </NavLink>
          </form>
        </div>
      </main>
    </div>
  );
}
