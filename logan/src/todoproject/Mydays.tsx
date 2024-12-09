import React, { useEffect, useState } from "react";
import Head from "./Header";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { Task } from "./Todo";
import { NavLink } from "react-router-dom";
import { Pencil } from "lucide-react";

const Mydays = () => {
  let [Tasks, setTasks] = useState<Task[]>();
  let [Taskday, settaskday] = useState<Task[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      let response = await axios.get("http://localhost:5000/todo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
      let beef = Tasks?.filter((el) => {
        return el.datecreate === new Date().getDate();
      });
      settaskday(beef);
    };
    fetchTask();
  }, [navigate, Tasks]);
  return (
    <div className="flex flex-col h-screen">
      <Head />
      <main className="bg-zinc-950 flex flex-col h-screen">
        <h1 className="uppercase text-2xl font-mono"> mes taches du jour</h1>
        <ul className="flex flex-col gap-3">
          {Taskday?.map((el) => (
            <motion.li
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-stone-700 hover:ring-blue-400 hover:ring-2 shadow-lg cursor-pointer  text-zinc-50 capitalize w-52 h-max rounded-md p-4 text-xl flex flex-col"
            >
              {el.content}
              <p>{el.timecreate}</p>
              <NavLink to={`/modify/${el._id}`}>
                <Pencil className="p-2 bg-blue-500 text-3xl rounded-full cursor-pointer" />
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Mydays;
