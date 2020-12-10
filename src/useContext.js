import React, { createContext, useState } from "react";

const QueryContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function ContextProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <UserDispatchContext.Provider value={setQuery}>
        {children}
      </UserDispatchContext.Provider>
    </QueryContext.Provider>
  );
}

export { ContextProvider, QueryContext, UserDispatchContext };
