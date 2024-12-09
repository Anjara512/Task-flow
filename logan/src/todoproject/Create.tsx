import React from "react";
import Head from "./Header";
import clsx from "clsx";
import { useProps } from "./contextApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import cn from "./utils";

const Create = () => {
  const { themes, users } = useProps();
  const navigue = useNavigate();
  //verifier email et aller a la page suivant
  const Verify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    let mail = data.get("email");
    if (mail) {
      users.email = mail.toString();
      console.log(users);
      navigue("/create2");
    }
  };
  return (
    <div className="flex flex-col">
      <Head />
      <main
        className={cn("h-screen flex justify-center gap-3  bg-neutral-800", {
          "bg-neutral-200": themes === "light",
        })}
      >
        <form action="" onSubmit={Verify} className="flex flex-col gap-3">
          <label className={cn("text-slate-100 text-2xl")} htmlFor="pass1">
            Adresse email:
          </label>
          <input
            type="email"
            className={cn(
              "w-80 h-15 shadow-lg bg-zinc-800 border outline-none border-lime-800  rounded-md focus:border focus:border-lime-900 text-white text-2xl p-3",
              { "bg-zinc-200 text-black": themes !== "dark" }
            )}
            name="email"
            placeholder="@gmail.com"
            id=""
          />

          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 1.5 }}
            className={clsx(
              "bg-blue-600 text-2xl font-mono w-max h-max p-2 rounded-md cursor-pointer ml-5 text-zinc-50 "
            )}
          >
            suivant
          </motion.button>
        </form>
      </main>
    </div>
  );
};

export default Create;
