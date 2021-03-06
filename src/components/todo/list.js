import Card from "../../UI/card";
import styled from "styled-components";
import { SettingsContext } from "../../context/settings/context";
import { useContext, useState, useEffect, useRef } from "react";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 70vh;
`;

const WideCard = styled(Card)`
  width: 20vw;
  margin-bottom: 0.5vh;
  display: flex;
  flex-direction: column;
  position: relative;
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
  &.active {
    background: #b5b3b3;
  }
`;

const P = styled.p`
  margin-bottom: 2px;
`;

const Delete = styled.div`
  color: red;
  cursor: pointer;
  position: absolute;
  top: 10%;
  right: 10%;
  font-size: 1.3rem;
`;

function List(props) {
  const indexRef = useRef();
  const settings = useContext(SettingsContext);
  const [data, setData] = useState([]);
  const [completed, setCompleted] = useState([]);
  const classesHandler = (e) => {
    const children = [].slice.call(indexRef.current.children);
    children.forEach((ele) => ele.classList.remove("active"));
    e.target.classList.add("active");
  };
  useEffect(() => {
    let filtered = props.dataList.filter((ele) => {
      if (settings.hideCompleted) {
        return ele.complete === false;
      } else {
        return true;
      }
    });
    setCompleted(filtered);
  }, [settings.hideCompleted, props.dataList]);
  useEffect(() => {
    if (completed.length <= settings.showNumber) {
      setData([...completed]);
    } else {
      let raw = ["", ...completed];
      let renderedData = [];
      for (let i = 1; i <= settings.showNumber; i++) {
        renderedData.push(raw[i]);
      }
      setData([...renderedData]);
    }
  }, [settings.showNumber, completed]);
  const handlePagination = (e) => {
    let raw = ["", ...completed];
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
  let rendered =
    data.length > 0 ? (
      data.map((item, idx) => {
        return (
          <WideCard key={item.id}>
            <P>{item.text}</P>
            <P>
              <small>Assigned to: {item.assignee}</small>
            </P>
            <P>
              <small>Difficulty: {item.difficulty}</small>
            </P>
            <div onClick={() => props.toggleComplete(item.id)}>
              Complete: {item.complete.toString()}
            </div>
            <Delete onClick={() => props.deleteItem(item.id)}>X</Delete>
          </WideCard>
        );
      })
    ) : (
      <P>no data</P>
    );
  let paginationIndex = !settings.hideCompleted
    ? Math.floor(props.dataList.length / settings.showNumber)
    : Math.floor(completed.length / settings.showNumber);
  let indices = Array.from({ length: paginationIndex }, (_, i) => i + 1).map(
    (ele, idx) => {
      if (idx === 0) {
        return (
          <Index className={"active"} onClick={handlePagination}>
            {ele}
          </Index>
        );
      }
      return <Index onClick={handlePagination}>{ele}</Index>;
    }
  );

  return (
    <Main>
      <div>{rendered}</div>
      <IndexList ref={indexRef} onClick={classesHandler}>
        {indices}
      </IndexList>
    </Main>
  );
}

export default List;
