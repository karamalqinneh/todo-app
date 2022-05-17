import styled from "styled-components";
import { SettingsContext } from "../../context/settings/context";
import React, { useContext } from "react";

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

function MainHeader(props) {
  const settings = useContext(SettingsContext);

  const handleNumberChange = (e) => {
    settings.setShowNumber(parseInt(e.target.value));
  };
  const handleShowChange = (e) => {
    settings.setShowCompleted(e.target.checked);
  };
  return (
    <>
      <Navbar className={props.className}>
        <H3>ToDo App</H3>
        <Nav>About us</Nav>
        <Nav>
          Number of Items
          <input
            type="number"
            onChange={handleNumberChange}
            max="4"
            min="2"
            step="1"
            value="2"
          />
        </Nav>
        <Nav>
          Hide Complete
          <input type="checkbox" onChange={handleShowChange} />
        </Nav>
      </Navbar>
    </>
  );
}

export default MainHeader;
