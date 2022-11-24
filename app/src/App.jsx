import React from "react";

import ToDo from "./Components/ToDo.jsx";
import SignUp from "./Components/SignUp.jsx";
import Navigation from "./Components/Navbar.jsx";
import Container from "react-bootstrap/Container";

import { AuthProvider } from "./Context/index.js";
import { useAuthContext } from "./Context/index.js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function PrivatePage({ children }) {
  const { logged } = useAuthContext();

  return logged ? children : <Navigate to={"/signup"} />;
}

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Container fluid className="h-100 g-0">
            <Navigation />
            <Routes>
              <Route
                path={"/"}
                element={
                  <PrivatePage>
                    <ToDo />
                  </PrivatePage>
                }
              />
              <Route path={"/signup"} element={<SignUp />} />
            </Routes>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
