import clsx from "clsx";
import React from "react";
import { useProps } from "./contextApi";
import Head from "./Header";
import Nav from "./Nav";
import axios from "axios";
import { motion } from "framer-motion";

const HomePageUser = () => {
  let { themes, userData } = useProps();
  const deconne = async () => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.post("http://localhost:5000/logout", {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data === "user deconnected") {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
      console.log("erreur lors de la connexion au serveur");
    }
  };
  return (
    <div
      className={clsx("bg-neutral-800 h-screen flex flex-col ", {
        "bg-neutral-100": themes !== "dark",
      })}
    >
      <Head />

      <div className={clsx("flex flex-row ")}>
        <Nav logout={deconne} source={userData[0]?.nom} lien={"/todo"} />
        <div className="bg-stone-700 flex justify-center  h-screen w-full">
          <div className=" mt-10 rounded-md w-1/2 h-3/4  bg-gradient-to-t from-cyan-700 to-purple-500">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-300 capitalize text-2xl pt-20 p-5"
            >
              bienvenu a vous monsieur {userData[0]?.nom}
              que puis-je faire pour vous aujourd'hui😘🥰
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageUser;
