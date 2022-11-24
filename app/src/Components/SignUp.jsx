import React from "react";

import Card from "react-bootstrap/Card";

import { useAuthContext } from "../Context/index.js";
import { GoogleButton } from "react-google-button";

function SignUp() {
  const authContext = useAuthContext();
  const { signIn } = authContext;
  return (
    <div className="my-4 row justify-content-md-center">
      <div className="p-1 col-lg-4 col">
        <Card className="bg-light">
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>Войти через Google</Card.Title>
            <GoogleButton
              onClick={() => {
                signIn();
              }}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
