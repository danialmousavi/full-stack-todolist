import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { verifyToken } from "@/utils/auth";
import userModel from "@/models/User";
import todoModel from "@/models/Todo";
import connectDB from "@/configs/db";

function Todolist({ user, todos }) {
  const [IsShowInput, setIsShowInput] = useState(false);
  const [todo, setTodo] = useState("");
  const [allTodos,setAllTodos]=useState([...todos])
  //get todos after adding new todos
  const getAllTodos = async () => {
  const res = await fetch("/api/todos");
  const data=await res.json();
  console.log(data);
      setAllTodos(data.todos)      
  };
  //add todos
  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todo, isCompleted: false }),
    });
    if (res.status == 201) {
      Swal.fire({
        title: "GREAT",
        text: "todo created successfully",
        icon: "success",
      }).then(()=>{
      getAllTodos();

      });
    } else {
      Swal.fire({
        title: "OOPS",
        text: "sth went wrong",
        icon: "error",
      });
    }
    setTodo("")
  };
  return (
    <>
      <h1>Next-Todos</h1>

      <div className="alert">
        <p>⚠ Please add a task first!</p>
      </div>

      <div className="container">
        <div
          className="form-container "
          style={IsShowInput ? { display: "block" } : { display: "none" }}
        >
          <div className="add-form">
            <input
              id="input"
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Type your To-Do works..."
            />
            <button type="submit" id="submit" onClick={addTodo}>
              ADD
            </button>
          </div>
        </div>
        <div className="head">
          <div className="date">
            <p>{user.firstname}-{user.lastname}</p>
          </div>
          <div className="add" onClick={() => setIsShowInput((prev) => !prev)}>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>
          <div className="time">
            <a href="#">Logout</a>
          </div>
        </div>
        <div className="pad">
          <div id="todo">
            <ul id="tasksContainer">
              {allTodos.map((todo) => (
                <li key={todo._id}>
                  <span className="mark">
                    <input type="checkbox" className="checkbox" />
                  </span>
                  <div className="list">
                    <p>{todo.title}</p>
                  </div>
                  <span className="delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todolist;
export async function getServerSideProps(context) {
  connectDB();
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const tokenPayload = verifyToken(token);
  if (!tokenPayload) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const user = await userModel.findOne({ email: tokenPayload.email });
  const todos = await todoModel.find({ user: user._id });
  console.log(todos);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}
