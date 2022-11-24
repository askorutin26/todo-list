import React, { useState } from "react";
import { useDispatch, batch } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useAppContext } from "../../Context/index.js";

import { setShow } from "../../store/modalsSlice.js";
import { changeTask } from "../../store/tasksSlice.js";

import { updateTask, stateInfo, stateStyle, getTimeDiff } from "../../utils.js";

function Task() {
  const AppContext = useAppContext();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setShow({ show: false }));

  const { modals, tasks } = AppContext;

  const show = modals.show;
  const ID = modals.taskID;

  const taskToShow = tasks.find((elem) => elem.id === ID);
  const {
    id,
    userID,
    task,
    description,
    endFormatted,
    startFormatted,
    state,
    imagesURL,
  } = taskToShow;

  const [oldTask, setTask] = useState(task);
  const [oldDescription, setDescription] = useState(description);
  const [oldDate, setDate] = useState(endFormatted);
  const newDiff = getTimeDiff(startFormatted, oldDate);

  const getNewState = () => {
    if (newDiff < 0) {
      return "active";
    } else if (newDiff === "notStated" && state !== "done") {
      return "active";
    } else if (newDiff === "notStated" && state === "done") {
      return "done";
    }
    return "expired";
  };

  return (
    <>
      <Modal show={show}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            const changes = {
              ...taskToShow,
              task: oldTask,
              state: getNewState(),
              description: oldDescription,
              endFormatted: oldDate,
              diff: getTimeDiff(startFormatted, oldDate),
            };

            updateTask({ id, userID }, changes).then(() => {
              batch(() => {
                dispatch(
                  changeTask({
                    id,
                    changes,
                  })
                );
                handleClose();
              });
            });
          }}
        >
          <Modal.Header>
            <Modal.Title>
              {`Задача ${id}`}
              <Badge
                bg={stateStyle[state]}
                className="text-wrap text-break ms-2"
              >
                {stateInfo[state]}
              </Badge>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Form.Group>
                  <Card.Title>
                    <Form.Control
                      value={oldTask}
                      onChange={(e) => {
                        setTask(e.target.value);
                      }}
                      className="border-0 fs-5 mb-2"
                    />
                  </Card.Title>

                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      placeholder="Дополнительно"
                      rows="3"
                      className="border-0"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={oldDescription}
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group>
                  <Card.Text className="mb-0">Начато:</Card.Text>
                  <Card.Text className="mb-2 ms-2 p-1">
                    {startFormatted}
                  </Card.Text>
                </Form.Group>
                <Form.Group className="row mb-0">
                  <Card.Text className="mb-2" type="date">
                    {`Завершить к:`}
                    <Form.Control
                      type="date"
                      controlid="duedate"
                      value={oldDate !== "notStated" ? oldDate : ""}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      className="border-0"
                    />
                  </Card.Text>
                </Form.Group>
                <Row className="justify-content-start mb-2">
                  {imagesURL !== "null" &&
                    imagesURL.map((url) => {
                      return (
                        <Col xs={12} sm={4} md={4}>
                          <img
                            src={url}
                            className="img-thumbnail"
                            alt="preview"
                          />
                        </Col>
                      );
                    })}
                </Row>
              </Card.Body>
            </Card>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              Отменить
            </Button>
            <Button variant="primary" id={id} type="submit">
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Task;
