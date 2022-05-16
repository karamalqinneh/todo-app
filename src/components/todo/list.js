import Card from "../../UI/card";
import styled from "styled-components";
import { SettingsContext } from "../../context/settings/context";
import { useContext, useState, useEffect } from "react";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 70vh;
`;

const WideCard = styled(Card)`
  width: 40vw;
  height: 20vh;
  margin-bottom: 1vh;
  display: flex;
  flex-direction: column;
`;

const IndexList = styled.div`
  height: 5vh;
  width: 40vw;
  display: flex;
  justify-content: flex-start;
`;

const Index = styled.div`
  height: 5vh;
  width: 2.5vw;
  margin-right: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  font-size: 1.2rem;
  color: rgba(9, 200, 195, 1);
  background-color: #fefefe;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  background: #fdfdfd;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

function List(props) {
  const settings = useContext(SettingsContext);
  const [data, setData] = useState([...props.dataList]);
  console.log(data);
  let paginationIndex = Math.floor(props.dataList.length / settings.showNumber);
  const handlePagination = (e) => {
    let raw = ["", ...props.dataList];
    let page = parseInt(e.target.innerHTML);
    let renderedData = [];
    for (let i = 1; i <= settings.showNumber * page; i++) {
      if (
        i >= settings.showNumber * page - settings.showNumber + 1 &&
        i <= settings.showNumber * page
      ) {
        renderedData.push(raw[i]);
      }
    }
    setData(renderedData);
  };

  let rendered = data.map((item) => (
    <WideCard key={item.id}>
      <p>{item.text}</p>
      <p>
        <small>Assigned to: {item.assignee}</small>
      </p>
      <p>
        <small>Difficulty: {item.difficulty}</small>
      </p>
      <div onClick={() => props.toggleComplete(item.id)}>
        Complete: {item.complete.toString()}
      </div>
    </WideCard>
  ));
  let indices = Array.from({ length: paginationIndex }, (_, i) => i + 1).map(
    (ele) => <Index onClick={handlePagination}>{ele}</Index>
  );
  return (
    <Main>
      <div>{rendered ? rendered : <p>no data</p>}</div>
      <IndexList>{indices}</IndexList>
    </Main>
  );
}

export default List;
