import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import NewTask from "./Modals/NewTask";
import Task from "./Modals/Task.jsx";
import AddTaskBtn from "./AddButton.jsx";

import SubmitDelete from "./Modals/SubmitDelete.jsx";
import TasksList from "./TasksList.jsx";

import { useAppContext, useAuthContext } from "../Context/index.js";

import { addTasks } from "../store/tasksSlice.js";
import { getTasks } from "../utils.js";

function ToDo() {
  const { modals, tasks } = useAppContext();
  const { logged } = useAuthContext();
  const { add: showAdd, show: showTask, delete: showDelete } = modals;
  const dispatch = useDispatch();
  useEffect(() => {
    if (logged) {
      const userID = localStorage.getItem("userID");
      getTasks(userID).then((result) => {
        const entries = Object.entries(result);
        const userTasks = entries.map((elem) => {
          const [id, data] = elem;
          return { id, ...data };
        });
        dispatch(addTasks(userTasks));
      });
    }
  }, [logged, dispatch]);
  return (
    <Container>
      <div className="my-4 row justify-content-md-center">
        <AddTaskBtn />
        {showAdd && <NewTask />}
        {showTask && <Task />}
        {showDelete && <SubmitDelete />}
        {tasks.length !== 0 && <TasksList />}
      </div>
    </Container>
  );
}

export default ToDo;
