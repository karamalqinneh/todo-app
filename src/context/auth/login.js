import React, { useEffect, useState } from "react";
import base64 from "base-64";
import superagent from "superagent";
// import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";

const API = `https://todo-auth-api.herokuapp.com`;
export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = async (username, password) => {
    const response = await superagent
      .post(`${API}/signin`)
      .set(
        "authorization",
        `Basic ${base64.encode(`${username}:${password}`)}`
      );
    validateMyUser(response.body);
  };

  const validateMyUser = (data) => {
    if (data) {
      const validUser = jwt_decode(data.token);
      if (validUser) {
        setLoginstate(true, data);
        cookie.save("userData", data);
      } else {
        setLoginstate(false, {});
      }
    } else {
      setLoginstate(false, {});
    }
  };

  const setLoginstate = (isLogged, userData) => {
    setLoggedIn(isLogged);
    setUser(userData);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser({});
    cookie.remove("userData");
  };

  useEffect(() => {
    const myUserInfo = cookie.load("userData");
    validateMyUser(myUserInfo);
  }, []);

  const canDo = (capability) => {
    // optional chaining
    return user?.action?.includes(capability);
  };

  const state = {
    loggedIn: loggedIn,
    user: user,
    login: login,
    logout: logout,
    canDo: canDo,
  };

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
