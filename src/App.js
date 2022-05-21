import React from "react";
import SettingsProvider from "./context/settings/context.js";
import LoginProvider from "./context/auth/login.js";
import ToDo from "./components/todo/todo.js";
import MainHeader from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import styled from "styled-components";
import Auth from "./context/auth/auth";

const Styling = styled.div`
  height: 80vh;
  width: 100vw;
`;

function App() {
  return (
    <LoginProvider>
      <SettingsProvider>
        <MainHeader />
        <Auth capability="read">
          <Styling>
            <ToDo />
          </Styling>
        </Auth>
        <Footer />
      </SettingsProvider>
    </LoginProvider>
  );
}

export default App;
