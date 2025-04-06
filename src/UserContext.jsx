import React from "react";
import { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [uid, setUid] = useState(null); // Initialize uid state

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
};
