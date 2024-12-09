import clsx from "clsx";
import React, { useState } from "react";
import { useProps } from "./contextApi";
import Head from "./Header";
import { motion } from "framer-motion";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router";

const Create3 = () => {
  const { themes, users } = useProps();
  const nav = useNavigate();

  //creation de dropdown
  let ages: number = 100;
  let tabs = [];
  for (let i = 0; i < ages - 1; i++) {
    tabs.push(i);
  }
  let [vue, setvue] = useState(false);

  //recupéré l'age
  const [age, setage] = useState<number>(18);

  const getAge = (e: number) => {
    setage(e);
    setvue(!vue);
  };
  const setPersonalInformation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let nom = data.get("nom");
    let sexe = data.get("sexe");
    if (nom && sexe) {
      users.nom = nom.toString();
      users.age = age;
      users.sexe = sexe.toString();
      nav("/photo");
    }
  };

  return (
    <div className={clsx("bg-slate-800 flex flex-col ")}>
      <Head />
      <main
        className={clsx("bg-slate-900 flex  justify-center h-screen", {
          "bg-slate-200": themes !== "dark",
        })}
      >
        <form
          action=""
          onSubmit={setPersonalInformation}
          className="flex gap-5 flex-col"
        >
          <h1 className={clsx("text-5xl text-zinc-50")}>Information</h1>
          <div
            className={clsx(
              "bg-slate-800 flex flex-col gap-4 mt-10 w-max h-max p-3 rounded-md",
              {
                "bg-lime-50": themes !== "dark",
              }
            )}
          >
            <label
              htmlFor="name"
              className={clsx("text-slate-100 flex flex-row text-2xl")}
            >
              Pseudo <IoPerson className={clsx("translate-y-2")} />
            </label>
            <input
              type="text"
              className={clsx(
                "w-80 h-15 bg-zinc-800 rounded-md text-white text-2xl p-3",
                { "bg-zinc-200 text-black": themes !== "dark" }
              )}
              name="nom"
              id=""
            />
          </div>

          <div className="flex flex-row gap-8">
            <div
              className={clsx(
                "bg-slate-800 flex flex-col gap-4 mt-10 w-max h-max p-3 rounded-md",
                {
                  "bg-lime-50": themes !== "dark",
                }
              )}
            >
              <label
                htmlFor="name"
                className={clsx("text-slate-100 flex flex-row text-2xl")}
              >
                Age
              </label>
              <p
                className={clsx(
                  "text-semibold pointer text-white p-2 rounded-md text-2xl border border-zinc-50",
                  {
                    "text-black  border-zinc-900": themes !== "dark",
                  }
                )}
                onClick={() => setvue(!vue)}
              >
                {age} {vue === true ? "^" : ">"}
              </p>
              {vue && (
                <ul
                  className={clsx(
                    "w-max h-20  z-10 overflow-y-scroll text-zinc-50",
                    {
                      "text-zinc-600": themes !== "dark",
                    }
                  )}
                >
                  {tabs.map((el, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => getAge(el)}
                        className="text-2xl font-mono hover:border hover:border-zinc-400 p-1 rounded-md "
                      >
                        {el}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div
              className={clsx(
                "bg-slate-800 flex flex-row gap-4 mt-10 w-max h-max p-3 rounded-md",
                {
                  "bg-lime-50": themes !== "dark",
                }
              )}
            >
              <label
                htmlFor="name"
                className={clsx("text-slate-100 flex flex-row text-2xl")}
              >
                Sexe:
              </label>
              <input
                className="text-3xl text-white"
                type="radio"
                name="sexe"
                value={"M"}
                id=""
              />
              <div className={clsx("text-white text-2xl")}>M</div>

              <input
                className="text-3xl text-white"
                type="radio"
                name="sexe"
                id=""
                value={"F"}
              />
              <div className={clsx("text-white text-2xl")}>F</div>
            </div>
          </div>
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

export default Create3;
