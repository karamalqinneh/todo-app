import styled, { keyframes } from "styled-components";
import { SettingsContext } from "../../context/settings/context";
import React, { useContext } from "react";
import FormModal from "../login-form/formModal";
import { Button } from "react-bootstrap";
import { LoginContext } from "../../context/auth/login";

const Navbar = styled.nav`
  color: #09c8c3;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  height: 10vh;
  background-color: rgba(9, 200, 195, 1);
  z-index: 999;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const Nav = styled.div`
  justify-content: flex-start;
  text-decoration: none;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  margin-left: 0.1rem;
  background-color: transparent;
  color: #fefefe;
  &.active {
    color: rgba(9, 200, 195, 1);
    background-color: #fefefe;
  }
`;
const H3 = styled.h3`
  width: 7rem;
  height: 3.33rem;
  font-size: 1.5rem;
  color: #fefefe;
`;

const fill = keyframes`
0%{
  background-color: rgb(9, 200, 195);
}
100% {
  background-color: #fefefe;
  color: rgb(9, 200, 195);

}
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fefefe;
  height: 7.5vh;
  width: 15vw;
  margin: 0;
  background-color: rgb(9, 200, 195);
  border-radius: 10px;
  border: 0px;
  color: #fefefe;
  &:hover {
    animation: ${fill} 1s linear;
    background-color: #fefefe;
    color: rgb(9, 200, 195);
  }
`;

function MainHeader(props) {
  const login = useContext(LoginContext);
  const [modalShow, setModalShow] = React.useState(false);

  const settings = useContext(SettingsContext);
  const handleNumberChange = (e) => {
    settings.editShowNumber(parseInt(e.target.value));
  };
  const handleShowChange = (e) => {
    settings.editHideCompleted(e.target.checked);
  };
  const authButton = !login.loggedIn ? (
    <StyledButton variant="primary" onClick={() => setModalShow(true)}>
      Login
    </StyledButton>
  ) : (
    <StyledButton variant="primary" onClick={() => login.logout()}>
      Logout
    </StyledButton>
  );

  return (
    <>
      <Navbar className={props.className}>
        <H3>ToDo App</H3>
        {authButton}
        <Nav>
          Number of Items
          <input
            type="number"
            onChange={handleNumberChange}
            max="3"
            min="1"
            step="1"
            defaultValue={settings.showNumber}
          />
        </Nav>
        <Nav>
          Hide Complete
          <input
            type="checkbox"
            onChange={handleShowChange}
            checked={settings.hideCompleted ? "checked" : ""}
          />
        </Nav>
      </Navbar>
      <FormModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default MainHeader;
