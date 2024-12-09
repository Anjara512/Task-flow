import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./todoproject/Homepage";
import Create from "./todoproject/Create";
import Provide from "./todoproject/contextApi";
import AddTodo from "./todoproject/AddTodo";
import Create2 from "./todoproject/create2";
import Create3 from "./todoproject/Create3";
import Sary from "./todoproject/Sary";
import HomePageUser from "./todoproject/HomePageUser";
import Todo from "./todoproject/Todo";
import ModifyTask from "./todoproject/ModifyTask";
import Mydays from "./todoproject/Mydays";

const App = () => {
  return (
    <Provide>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Mydays" element={<Mydays/>}></Route>
          <Route path="/createUser" element={<Create />}></Route>
          <Route path="/AddTodo" element={<AddTodo />} />
          <Route path="/create2" element={<Create2 />}></Route>
          <Route path="/create3" element={<Create3 />}></Route>
          <Route path="/photo" element={<Sary />} />
          <Route path="/UserProfil" element={<HomePageUser />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/modify/:id" element={<ModifyTask />} />
        </Routes>
      </BrowserRouter>
    </Provide>
  );
};

export default App;
