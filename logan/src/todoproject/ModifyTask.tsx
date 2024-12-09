import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Task } from "./Todo";
import clsx from "clsx";

const ModifyTask = () => {
  const nav = useNavigate();
  const { id } = useParams();
  let [pop, setpop] = useState<Task[]>();

  useEffect(() => {
    const getModifyElement = async () => {
      try {
        let token = localStorage.getItem("token");
        let reponse = await axios.get(`http://localhost:5000/modify/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setpop(reponse.data);
      } catch (error) {}
    };
    getModifyElement();
  }, [nav, id]);
  let [news, setnews] = useState(" ");
  const modifyTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (news.length !== 0) {
      try {
        const token = localStorage.getItem("token");
        let response = await axios.patch(
          `http://localhost:5000/modify/${id}`,
          { content: news, createdAt: new Date().toLocaleTimeString() },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data === "ok") {
          nav("/todo");
        }
      } catch (error) {}
    }
  };

  return (
    <div
      className={clsx(
        "h-screen bg-neutral-600 flex flex-row gap-10  justify-center"
      )}
    >
      <div className="mt-20 flex flex-row">
        {pop?.map((el) => (
          <div className="flex flex-col gap-2">
            <p className={clsx("text-slate-100 text-2xl")}>ancien contenu</p>
            <div className="w-max h-max p-10 bg-zinc-500 rounded-md ">
              {el.content}
            </div>
          </div>
        ))}
      </div>
      <form
        action=""
        onSubmit={modifyTask}
        className="mt-20 flex flex-col gap-2 "
      >
        <label className={clsx("text-slate-100 text-2xl")} htmlFor="newtache">
          nouveau contenu
        </label>
        <input
          className={clsx(
            "w-max h-max p-5 rounded-md text-2xl bg-zinc-800 text-white "
          )}
          value={news}
          onChange={(e) => setnews(e.target.value)}
          name="newtache"
          type="text"
        ></input>
        {news.length !== 0 ? (
          <button className="   rounded-md mx-3 my-2 w-max h-max p-1  bg-blue-950 ring-1  hover:ring-4 ring-offset-1 text-2xl text-white">
            Modify
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default ModifyTask;
