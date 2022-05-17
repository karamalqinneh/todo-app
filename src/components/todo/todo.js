import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form";
import Card from "../../UI/card";
import styled from "styled-components";
import { SettingsContext } from "../../context/settings/context";
import { v4 as uuid } from "uuid";
import List from "./list";

const Section = styled.section`
  display: flex;
  width: 100vw;
  height: 80vh;
  justify-content: space-around;
  align-items: center;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30vw;
  height: 65vh;
`;

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const settings = useContext(SettingsContext);
  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }
  useEffect(() => {
    let filtered = list.filter(
      (item) => item.complete == settings.showCompleted
    );
    setList(filtered);
  }, [settings.showCompleted]);
  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);
  return (
    <Section>
      <StyledCard>
        <header>
          <h1>To Do List: {incomplete} items pending</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>

          <label>
            <div>To Do Item</div>
            <input
              onChange={handleChange}
              name="text"
              type="text"
              placeholder="Item Details"
            />
          </label>

          <label>
            <div>Assigned To</div>
            <input
              onChange={handleChange}
              name="assignee"
              type="text"
              placeholder="Assignee Name"
            />
          </label>

          <label>
            <div>Difficulty</div>
            <input
              onChange={handleChange}
              defaultValue={3}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </label>

          <div>
            <button type="submit">Add Item</button>
          </div>
        </form>
      </StyledCard>
      <List dataList={list} toggleComplete={toggleComplete} />
    </Section>
  );
};

export default ToDo;
