import styled from "styled-components";

const Main = styled.footer`
  width: 100vw;
  height: 10vh;
  background-color: rgba(9, 200, 195, 1);
  color: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Footer() {
  return <Main>Project by Karam Al-Qinneh</Main>;
}

export default Footer;
