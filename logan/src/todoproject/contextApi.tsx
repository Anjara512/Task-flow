import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  email: string;
  password: string;
  nom: string;
  age: number;
  sexe: string;
  task: Task[];
  photo: string;
}
interface Task {
  _id: string;
  content: string;
  timecreate: string;
  datecreate: number;
}
const ContextTodo = createContext({
  themes: "",
  toogleTheme: function () {},
  users: { email: "", password: "", nom: "", age: 18, sexe: "M", photo: "" },
  userData: [
    {
      email: "",
      password: "",
      nom: "",
      age: 18,
      sexe: "M",
      photo: "",
      task: [
        {
          content: "",
          timecreate: new Date().toLocaleTimeString(),
          datecreate: new Date().getDate(),
          _id: " ",
        },
      ],
    },
  ],
});

const Provide = ({ children }: { children: ReactNode }) => {
  const [themes, setthemes] = useState<string>("dark");
  let users: User = {
    email: "",
    password: "",
    nom: "",
    age: 18,
    sexe: "M",
    task: [
      {
        content: "",
        timecreate: new Date().toLocaleTimeString(),
        datecreate: new Date().getDate(),
        _id: " ",
      },
    ],
    photo: "",
  };
  let userData: any = [];
  const toogleTheme = (): void => {
    setthemes(themes === "dark" ? "light" : "dark");
  };
  return (
    <ContextTodo.Provider value={{ themes, toogleTheme, users, userData }}>
      {children}
    </ContextTodo.Provider>
  );
};

export default Provide;

export const useProps = () => {
  return useContext(ContextTodo);
};
