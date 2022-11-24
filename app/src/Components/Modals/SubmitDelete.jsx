import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useDispatch } from "react-redux";
import { useAppContext } from "../../Context/index.js";

import { setShow } from "../../store/modalsSlice.js";
import { deleteTask } from "../../store/tasksSlice.js";
import { deleteTaskFromFirebase } from "../../utils.js";

function SubmitDelete() {
  const AppContext = useAppContext();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setShow({ delete: false }));

  const { modals, tasks } = AppContext;

  const show = modals.delete;
  const deleteID = modals.taskID;
  const taskToRemove = tasks.find((elem) => elem.id === deleteID);

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{"Удалить задачу?"}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              deleteTaskFromFirebase(taskToRemove).then(() => {
                dispatch(deleteTask(deleteID));
              });

              handleClose();
            }}
          >
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubmitDelete;
