import { Form, Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../context/auth/login";
import superagent from "superagent";

const API = `https://todo-auth-api.herokuapp.com`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  background: #fefefe;
`;

const Input = styled.input`
  height: 2.5rem;
  width: 100%;
  margin-top: 1rem;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  font-size: 1.1rem;
  text-align: center;
  background-color: #fefefe;
`;

const RemmemberMe = styled.div`
  margin-top: 1rem;
  overflow: none;
  width: auto;
  background-color: #fefefe;
`;

const StyledButton = styled(Button)`
  height: 2.5rem;
  width: 12.5vw;
  margin-top: 1rem;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #09c8c3;
  color: #fefefa;
  box-shadow: 1px 3px 1px rgb(0 0 0, 0.2);
`;

const Link = styled.a`
  margin-top: 1rem;
  text-decoration: underline;
  color: blue;
  background-color: #fefefe;
`;

function FormModal(props) {
  const login = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("read");
  const [showSignup, setShowSignup] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    login.login(username, password);
  }
  async function handleSignup(e) {
    e.preventDefault();
    let newUser = {
      username: username,
      password: password,
      role: role == "Select Your Role" ? "read" : role,
    };
    let req = await superagent.post(`${API}/signup`).send(newUser);
  }
  const signupForm = (
    <StyledForm
      className={props.className}
      onSubmit={(e) => {
        handleSignup(e);
        setTimeout(() => {
          setShowSignup(false);
        }, 3000);
      }}
    >
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Form.Select
        onChange={(e) => {
          setRole(e.target.value);
        }}
      >
        <option>Select Your Role</option>
        <option value="read">Read</option>
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </Form.Select>
      <StyledButton type="submit">Sign up</StyledButton>
      <Link
        onClick={() => {
          setShowSignup(false);
        }}
      >
        If you have an account login
      </Link>
    </StyledForm>
  );

  const signinForm = (
    <StyledForm
      className={props.className}
      onSubmit={(e) => {
        handleSubmit(e);
        props.onHide();
      }}
    >
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <RemmemberMe>
        <input
          type="checkbox"
          style={{
            backgroundColor: "#fefefe",
            width: "1.2rem",
            height: "1.2rem",
          }}
        />
        <label style={{ marginLeft: "0.5rem", backgroundColor: "#fefefe" }}>
          Remmember me
        </label>
      </RemmemberMe>
      <StyledButton type="submit">Sign in</StyledButton>
      <Link>Forgot Password?</Link>
      <Link
        onClick={() => {
          setShowSignup(true);
        }}
      >
        Do you have an account? If not Create one
      </Link>
    </StyledForm>
  );
  let renderForm = showSignup ? signupForm : signinForm;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
