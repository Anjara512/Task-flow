import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Head from "./Header";
import axios from "axios";
import { useNavigate } from "react-router";
import { MagnetIcon, AudioLinesIcon } from "lucide-react";
import cn from "./utils";
import { useProps } from "./contextApi";

const AddTodo = () => {
  //ajouter le tache vocalement

  //ajouter le tache manuellement
  const { themes } = useProps();
  const [taskval, settaskval] = useState("");
  let navigue = useNavigate();
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (taskval.length === 0) return;
    else {
      try {
        let response = await axios.post(
          "http://localhost:5000/addTask",
          {
            content: taskval,
            timecreate: new Date().toLocaleTimeString(),
            datecreate: new Date().getDate(),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data === "ok") {
          navigue("/todo");
          settaskval(" ");
        }
      } catch (error) {
        alert("erreur lors de l ajout de la tache");
      }
    }
  };

  return (
    <div
      className={cn("h-screen bg-neutral-950 text-zinc-50 flex flex-col", {
        "bg-neutral-50": themes !== "dark",
      })}
    >
      <Head />
      <main className={clsx("flex  h-screen justify-center gap-3")}>
        <form
          className={clsx("flex flex-col gap-2 mt-10")}
          action=""
          onSubmit={handleAddTask}
        >
          <textarea
            className={cn(
              "bg-zinc-800 text-white text-2xl w-60 h-52 focus:outline-none border border-purple-800 rounded-md",
              {
                "bg-slate-200 text-zinc-800": themes !== "dark",
              }
            )}
            name="task"
            onChange={(e) => settaskval(e.target.value)}
            value={taskval}
            id=""
          />
          <AudioLinesIcon
            className={cn(
              "text-5xl text-white bg-zinc-500 rounded-full cursor-pointer p-2 w-max h-max ",
              {
                "text-black": themes !== "dark",
              }
            )}
          />
          {taskval && (
            <button className=" rounded-md mx-3 my-2 w-max h-max p-1  bg-blue-950 ring-1  hover:ring-4 ring-offset-1 text-2xl text-white">
              ajouter
            </button>
          )}
        </form>
      </main>
    </div>
  );
};

export default AddTodo;
