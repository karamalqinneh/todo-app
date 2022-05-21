import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form";
import Card from "../../UI/card";
import styled from "styled-components";
import { SettingsContext } from "../../context/settings/context";
import { LoginContext } from "../../context/auth/login";
import List from "./list";
import superagent from "superagent";

const API = `https://todo-auth-api.herokuapp.com`;

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
  const login = useContext(LoginContext);
  useEffect(() => {
    const getAPIData = async () => {
      let response = await superagent.get(
        "https://todo-auth-api.herokuapp.com/todo"
      );

      let body = await response.body;
      body.sort((a, b) => {
        let x = a["id"];
        let y = b["id"];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      setList(body);
    };
    getAPIData();
  }, []);
  useEffect(() => {
    let filtered = list.filter(
      (item) => item.complete == settings.showCompleted
    );
    setList(filtered);
  }, [settings.showCompleted]);
  async function addItem(item) {
    item.complete = false;
    let newItem = { ...item, username: login.user.username };
    console.log(newItem);
    let req = await superagent.post(`${API}/add-todo`).send(newItem);
    setList([...list, item]);
  }
  async function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    let req = await superagent.put(`${API}/delete-todo/${id}`);
    setList(items);
  }

  async function toggleComplete(id) {
    if (login.canDo("update")) {
      const items = list.map((item) => {
        if (item.id == id) {
          item.complete = !item.complete;
        }
        return item;
      });
      let req = await superagent.put(`${API}/update-todo/${id}`);
      console.log(req);
      setList(items);
    } else {
      console.log("Can't");
    }
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
            {login.canDo("create") ? (
              <button type="submit">Add Item</button>
            ) : (
              <p>You cant post a new todo</p>
            )}
          </div>
        </form>
      </StyledCard>
      <List
        dataList={list}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    </Section>
  );
};

export default ToDo;
