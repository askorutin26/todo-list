import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { useAuthContext } from "../Context/index.js";

function Navigation() {
  const { logged, signUserOut, setUserID } = useAuthContext();

  function LogOutBtn() {
    return (
      <Button
        variant="primary"
        onClick={() => {
          localStorage.removeItem("userID");
          setUserID("");
          signUserOut();
        }}
      >
        Выйти
      </Button>
    );
  }
  return (
    <Navbar bg="light" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand>ToDo App</Navbar.Brand>
        {logged ? <LogOutBtn /> : null}
      </Container>
    </Navbar>
  );
}

export default Navigation;
