import clsx from "clsx";
import React, { useState } from "react";
import Head from "./Header";
import { useProps } from "./contextApi";
import axios from "axios";
import { motion } from "framer-motion";
import { IoCamera, IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router";

const Sary = () => {
  let { themes, users } = useProps();
  const nav = useNavigate();
  const [imgsrc, setimgsrc] = useState<string>("");
  let allowType = ["jpeg", "png", "jpg", "gif"];

  //Ajouter le photo de profil
  const getPicture = (e: any) => {
    let fichier = e.target.files[0];
    let type = fichier.name;
    let truetype = type.split(".");
    let tabs = truetype[truetype.length - 1].toLowerCase();
    if (allowType.indexOf(tabs) !== -1) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setimgsrc(String(e.target?.result));
      };
      reader.readAsDataURL(fichier);
    }
  };
  //Creation du compte
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      users.photo = imgsrc.toString();
      await axios.post("http://localhost:5000/createUser", users);
      alert("compte creer avec succes");
      users = {
        email: "",
        password: "",
        nom: "",
        age: 18,
        sexe: "M",
        photo: " ",
      };
      nav("/");
    } catch (err) {
      console.error(err);
      alert("erreur lors de la creation de la compte");
    }
  };

  return (
    <div className={clsx("flex flex-col")}>
      <Head />
      <main
        className={clsx("flex justify-center h-screen bg-neutral-900", {
          "bg-zinc-50": themes !== "dark",
        })}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className={clsx(" mt-10 flex flex-col gap-10 w-max h-max p-3")}
        >
          <p
            className={clsx(
              "border p-3  border-white rounded-md text-2xl text-zinc-50 capitalize"
            )}
          >
            Ajouter une photo de profil{" "}
          </p>
          {imgsrc.length === 0 ? (
            <label htmlFor="photo" className="relative">
              <IoPerson className="text-9xl  rounded-full bg-red-50 " />
              <IoCamera className="absolute cursor-pointer text-white left-24 top-20 text-5xl" />
            </label>
          ) : (
            <label htmlFor="photo">
              <img
                src={imgsrc}
                alt=""
                className="w-40 h-40  rounded-full "
              ></img>
            </label>
          )}
          <input
            type="file"
            onChange={getPicture}
            className="hidden"
            name=""
            id="photo"
          />
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 1.5 }}
            className={clsx(
              "bg-lime-600 flex flex-row gap-2 text-2xl font-mono w-max h-max p-2 rounded-md cursor-pointer ml-5 text-zinc-50 "
            )}
          >
            Creer le compte
            <IoPerson />
          </motion.button>
        </form>
      </main>
    </div>
  );
};

export default Sary;
