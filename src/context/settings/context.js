import React, { useState } from "react";

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [showNumber, setShowNumber] = useState(2);
  const state = { showCompleted, setShowCompleted, showNumber, setShowNumber };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}
