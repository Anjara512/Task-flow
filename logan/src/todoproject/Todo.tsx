import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Head from "./Header";
import { IoAdd, IoPencil, IoRemoveCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import cn from "./utils";
import { useProps } from "./contextApi";

export interface Task {
  _id: string;
  content: string;
  timecreate: string;
  datecreate: number;
}

const Todo = () => {
  const { themes } = useProps();

  let [Tasks, setTasks] = useState<Task[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      let response = await axios.get("http://localhost:5000/todo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };
    fetchTask();
  }, [navigate]);

  const deleteAny = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      let response = await axios.delete(`http://localhost:5000/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("tsy mety e" + error);
    }
  };
  const [searcher, setsearcher] = useState(" ");
  const [filtre, setfiltre] = useState<Task[]>();
  let getResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearcher(e.target.value);
    if (searcher.length === 0) return;
    else {
      let news = Tasks?.filter((el) => {
        return (
          el.content.substring(0, searcher.length - 1) ===
          searcher.substring(0, searcher.length - 1)
        );
      });
      setfiltre(news);
    }
  };
  return (
    <div
      className={cn("flex flex-col h-screen bg-zinc-950", {
        "bg-zinc-50": themes !== "dark",
      })}
    >
      <Head />
      <main
        className={cn(
          "flex flex-row bg-zinc-700 border border-lime-700  justify-evenly ",
          {
            "bg-white": themes !== "dark",
          }
        )}
      >
        <div
          className={cn(
            "flex felx-row mt-2 bg-zinc-800 p-2 w-max h-max gap-2 rounded-md",
            {
              "bg-zinc-200": themes !== "dark",
            }
          )}
        >
          <Search
            className={cn("text-white cursor-pointer", {
              "text-black": themes !== "dark",
            })}
          />
          <input
            type="text"
            placeholder="search..."
            className={cn("bg-stone-500 h-10 w-64 rounded-md text-zinc-50 ", {
              "bg-stone-400 text-black": themes !== "dark",
            })}
            name=""
            value={searcher}
            onChange={getResult}
            id=""
          />
        </div>
        <h1 className="text-zinc-50   uppercase text-5xl ">My tasks</h1>
        <NavLink
          to={"/AddTodo"}
          className={clsx(
            " flex felx-row  gap-1 bg-blue-950 p-2 rounded-lg text-zinc-50 text-2xl m-3"
          )}
        >
          Ajouter une nouvelle tache
          <IoAdd className="text-zinc-50 text-5xl bg-blue-500 p-3 rounded-full  cursor-pointer" />
        </NavLink>
      </main>

      <ul className={cn("grid grid-cols-4 gap-3 mt-4 ", {})}>
        {searcher !== " "
          ? filtre?.map((el, id) => (
              <motion.li
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-stone-700 hover:ring-blue-400 hover:ring-2 shadow-lg cursor-pointer  text-zinc-50 capitalize w-52 h-max rounded-md p-4 text-xl flex flex-col"
                key={el._id}
              >
                <div className="flex flex-row justify-between">
                  {el.content}
                  <NavLink to={`/modify/${el._id}`}>
                    <IoPencil className="p-2 bg-blue-500 text-3xl rounded-full cursor-pointer" />
                  </NavLink>
                  <IoRemoveCircleSharp
                    onClick={() => deleteAny(el._id)}
                    className="p-2 bg-blue-500 text-3xl rounded-full cursor-pointe"
                  />
                </div>
                <p className="text-sm w-full right  ">{el.timecreate}</p>
                <p className="text-sm w-full right  ">{el.datecreate}</p>
              </motion.li>
            ))
          : Tasks?.map((el, id) => (
              <motion.li
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-stone-700 hover:ring-blue-400 hover:ring-2 shadow-lg cursor-pointer  text-zinc-50 capitalize w-52 h-max rounded-md p-4 text-xl flex flex-col"
                key={el._id}
              >
                <div className="flex flex-row justify-between">
                  {el.content}
                  <NavLink to={`/modify/${el._id}`}>
                    <IoPencil className="p-2 bg-blue-500 text-3xl rounded-full cursor-pointer" />
                  </NavLink>
                  <IoRemoveCircleSharp
                    onClick={() => deleteAny(el._id)}
                    className="p-2 bg-blue-500 text-3xl rounded-full cursor-pointe"
                  />
                </div>
                <p className="text-sm w-full right  ">{el.timecreate}</p>
                <p className="text-sm w-full right  ">{el.datecreate}</p>
              </motion.li>
            ))}
      </ul>
    </div>
  );
};

export default Todo;
