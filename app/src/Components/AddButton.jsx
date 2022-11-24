import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import { setShow } from "../store/modalsSlice.js";

function AddTaskBtn() {
  const dispatch = useDispatch();

  return (
    <div className="p-1 col-lg-3 col">
      <Card className="bg-light">
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>Создать новую задачу</Card.Title>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ add: true }));
            }}
          >
            Добавить
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddTaskBtn;
