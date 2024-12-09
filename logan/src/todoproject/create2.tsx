import Head from "./Header";
import { useProps } from "./contextApi";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import cn from "./utils";

export default function Create2() {
  //gerer le theme de la page

  const { themes, users } = useProps();
  const [typeone, settypeone] = useState("password");
  const [typetwo, settypetwo] = useState("password");
  const togglepassone = () => {
    settypeone(typeone === "password" ? "text" : "password");
  };
  const togglepasstwo = () => {
    settypetwo(typetwo === "password" ? "text" : "password");
  };

  //pour gerer la navigation
  const nav = useNavigate();
  const runToLast = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = new FormData(e.currentTarget);
    let pass1 = data.get("pass1");
    let pass2 = data.get("pass2");
    if (pass1 && pass2) {
      if (pass1 === pass2) {
        users.password = pass1.toString();

        nav("/create3");
      } else {
        alert("mot de passe non identique");
      }
    } else alert("veiller remplir tous les champs");
  };
  return (
    <div className={cn("bg-slate-800 flex flex-col ")}>
      <Head />
      <main
        className={cn("bg-slate-900  flex justify-center h-screen", {
          "bg-slate-200": themes !== "dark",
        })}
      >
        <form
          action=""
          onSubmit={runToLast}
          className={cn(
            "bg-slate-800 flex flex-col gap-4 mt-10 w-max h-max p-3 rounded-md",
            {
              "bg-lime-50": themes !== "dark",
            }
          )}
        >
          <label
            className={cn("text-slate-100 text-2xl", {
              "text-slate-800": themes !== "dark",
            })}
            htmlFor="pass1"
          >
            Entrer un mot de passe:
          </label>
          <div
            className={cn("flex flex-row rounded-md bg-zinc-600 gap-2  p-2", {
              "bg-zinc-300": themes !== "dark",
            })}
          >
            <input
              className={cn(
                "w-80 h-15 bg-zinc-800 outline-none rounded-md focus:border focus:border-lime-900 text-white text-2xl p-3",
                { "bg-zinc-200 text-black": themes !== "dark" }
              )}
              type={typeone}
              name="pass1"
              id=""
            />
            {typeone === "password" ? (
              <Eye
                onClick={togglepassone}
                className={cn("text-3xl cursor-pointer mt-3 text-zinc-100 ", {
                  "text-stone-800": themes !== "dark",
                })}
              />
            ) : (
              <EyeOff
                onClick={togglepassone}
                className={cn("text-3xl cursor-pointer mt-3 text-zinc-100 ", {
                  "text-stone-800": themes !== "dark",
                })}
              />
            )}
          </div>
          <label
            className={cn("text-slate-100 text-2xl", {
              "text-slate-800": themes !== "dark",
            })}
            htmlFor="pass2"
          >
            Entrer a nouveau le mot de passe:
          </label>
          <div
            className={cn("flex flex-row rounded-md bg-zinc-600 gap-2  p-2", {
              "bg-zinc-300": themes !== "dark",
            })}
          >
            <input
              className={cn(
                "w-80  h-15 bg-zinc-800 outline-none rounded-md focus:border focus:border-lime-900 text-white text-2xl p-3",
                { "bg-zinc-200 text-black": themes !== "dark" }
              )}
              type={typetwo}
              name="pass2"
              id=""
            />
            {typetwo === "password" ? (
              <Eye
                onClick={togglepasstwo}
                className={cn("text-3xl cursor-pointer mt-3 text-zinc-100 ", {
                  "text-stone-800": themes !== "dark",
                })}
              />
            ) : (
              <EyeOff
                onClick={togglepasstwo}
                className={cn("text-3xl cursor-pointer mt-3 text-zinc-100 ", {
                  "text-stone-800": themes !== "dark",
                })}
              />
            )}
          </div>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 1.5 }}
            className={cn(
              "bg-blue-600 text-2xl font-mono w-max h-max p-2 rounded-md cursor-pointer ml-5 text-zinc-50 "
            )}
          >
            suivant
          </motion.button>
        </form>
      </main>
    </div>
  );
}
