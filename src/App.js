import React from "react";
import SettingsProvider from "./context/settings/context.js";
import ToDo from "./components/todo/todo.js";
import MainHeader from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import styled from "styled-components";

const Styling = styled.div`
  height: 80vh;
  width: 100vw;
`;

function App() {
  return (
    <SettingsProvider>
      <MainHeader />
      <Styling>
        <ToDo />
      </Styling>
      <Footer />
    </SettingsProvider>
  );
}

export default App;
