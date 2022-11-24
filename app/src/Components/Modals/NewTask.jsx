import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useAppContext, useAuthContext } from "../../Context/index.js";
import { setShow } from "../../store/modalsSlice.js";
import { addTask } from "../../store/tasksSlice.js";

import {
  getNewTask,
  addTaskToFirebase,
  getTimeDiff,
  getDates,
} from "../../utils.js";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function NewTask() {
  const inputEl = useRef();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [finishDate, setDate] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const AppContext = useAppContext();
  const AuthContext = useAuthContext();
  const { userID } = AuthContext;

  const { modals } = AppContext;
  const show = modals.add;

  const handleClose = () => dispatch(setShow({ add: false }));
  const dispatch = useDispatch();

  const { startFormatted, endFormatted } = getDates(finishDate);

  useEffect(() => {
    inputEl.current.focus();
  }, []);
  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagesURL =
      imageFiles.length !== 0
        ? imageFiles.map((elem) => URL.createObjectURL(elem))
        : "null";

    const data = {
      task,
      description,
      startFormatted,
      endFormatted,
      diff: getTimeDiff(startFormatted, endFormatted),
      imagesURL,
      state: "active",
      userID,
    };

    addTaskToFirebase(data);
    getNewTask(userID).then((result) => {
      dispatch(addTask(result));
    });

    setTask("");
    setDate("");
    setDescription("");
    handleClose();
  };
  return (
    <>
      <Modal show={show}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Новая задача</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlid="task">
              <Form.Label>Цель</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Что нужно сделать"
                value={task}
                ref={inputEl}
                onChange={(e) => {
                  e.preventDefault();
                  setTask(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlid="formBasicPassword">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Дополнительно"
                value={description}
                onChange={(e) => {
                  e.preventDefault();
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Дата завершения</Form.Label>
              <Form.Control
                type="date"
                controlid="duedate"
                value={finishDate}
                onChange={(e) => {
                  e.preventDefault();
                  setDate(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Прикрепить изображения</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  const { files } = e.target;
                  const validImageFiles = [];
                  for (let i = 0; i < files.length; i += 1) {
                    const file = files[i];
                    if (file.type.match(imageTypeRegex)) {
                      validImageFiles.push(file);
                    }
                  }
                  if (validImageFiles.length) {
                    setImageFiles(validImageFiles);
                    return;
                  }
                  alert("Selected images are not of valid type!");
                }}
              />
            </Form.Group>
            <Row className="justify-content-md-start">
              {images.length !== 0 &&
                images.map((image, idx) => {
                  return (
                    <Col xs={12} sm={4} md={4} key={idx}>
                      <img
                        key={idx}
                        src={image}
                        className="img-thumbnail"
                        alt="preview"
                      />
                    </Col>
                  );
                })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default NewTask;
