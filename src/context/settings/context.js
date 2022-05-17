import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

export const handleLocalStorage = () => {
  if (!JSON.parse(localStorage.getItem("userSettings"))) {
    localStorage.setItem("userSettings", JSON.stringify({}));
  }
  let userSettings = JSON.parse(localStorage.getItem("userSettings"));
  return userSettings;
};

export default function SettingsProvider(props) {
  let originalUserSettings = handleLocalStorage();
  const [hideCompleted, setHideCompleted] = useState(
    originalUserSettings.hideCompleted || false
  );
  const [showNumber, setShowNumber] = useState(
    originalUserSettings.showNumber || 2
  );
  const editHideCompleted = (value) => {
    originalUserSettings["hideCompleted"] = value;
    setHideCompleted(value);
    localStorage.setItem("userSettings", JSON.stringify(originalUserSettings));
  };
  const editShowNumber = (value) => {
    console.log(showNumber, "Before");
    originalUserSettings["showNumber"] = value;
    localStorage.setItem("userSettings", JSON.stringify(originalUserSettings));
    setShowNumber(originalUserSettings.showNumber);
    console.log(showNumber, "After");
  };
  const state = {
    hideCompleted,
    editHideCompleted,
    showNumber,
    editShowNumber,
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}
