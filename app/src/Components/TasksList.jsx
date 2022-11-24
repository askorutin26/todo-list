import React, { useEffect } from "react";
import { useDispatch, batch } from "react-redux";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem.js";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import { useAppContext } from "../Context/index.js";

import { setShow, setID } from "../store/modalsSlice";
import { changeTask } from "../store/tasksSlice.js";

import { stateInfo, stateStyle, updateTask } from "../utils.js";

function TasksList() {
  const AppContext = useAppContext();
  const dispatch = useDispatch();

  const { tasks } = AppContext;

  const list = [];
  const updateState = () => {
    tasks.forEach((elem) => {
      const { id, diff, state } = elem;
      if (!diff > 0 && state !== "done") {
        dispatch(changeTask({ id, changes: { state: "expired" } }));
      }
    });
  };
  useEffect(() => {
    const timer = setInterval(updateState, 4000);
    return () => clearInterval(timer);
  });
  tasks.forEach((elem) => {
    const { id, task, state } = elem;

    list.unshift(
      <ListGroupItem
        id={id}
        key={id}
        as="li"
        type="button"
        data-action="show"
        onClick={(e) => {
          e.preventDefault();
          const target = e.target;
          const targetId = target.id;
          const actionType = target.dataset.action;

          if (actionType === "show") {
            batch(() => {
              dispatch(setShow({ show: true }));
              dispatch(setID(targetId));
            });
          }
        }}
        className="d-flex justify-content-between align-items-start "
      >
        <div
          className="ms-2 me-auto text-truncate"
          id={id}
          type="button"
          data-action="show"
        >
          <div className="fw-bold text-truncate" id={id} data-action="show">
            {task}
          </div>
          <Badge id={id} className={`mb-2 bg-${stateStyle[state]}`}>
            {stateInfo[state]}
          </Badge>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic" />

          <Dropdown.Menu>
            <Dropdown.Item
              className="text-success"
              href="#/action-1"
              data-action="done"
              id={id}
              onClick={(e) => {
                const target = e.target;
                const targetID = target.id;

                const taskToShow = tasks.find((elem) => elem.id === targetID);
                const changes = { ...taskToShow, state: "done" };
                const { userID, id } = taskToShow;

                updateTask({ id, userID }, changes);
                dispatch(changeTask({ id: targetID, changes }));
              }}
            >
              Выполнено
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-2"
              data-action="change"
              id={id}
              onClick={(e) => {
                e.preventDefault();
                const target = e.target;
                const targetID = target.id;
                batch(() => {
                  dispatch(setID(targetID));
                  dispatch(setShow({ show: true }));
                });
              }}
            >
              Изменить
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              href="#/action-3"
              id={id}
              onClick={(e) => {
                e.preventDefault();
                const target = e.target;
                const targetID = target.id;
                batch(() => {
                  dispatch(setID(targetID));
                  dispatch(setShow({ delete: true }));
                });
              }}
            >
              Удалить
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroupItem>
    );
  });
  return (
    <div className="p-1 col-lg-4">
      <Card>
        <ListGroup as="ol" numbered>
          {list}
        </ListGroup>
      </Card>
    </div>
  );
}

export default TasksList;
