import React, { createContext } from "react";

import { useSelector } from "react-redux";
import { tasksSelector } from "../store/tasksSlice.js";

const AppContext = createContext({});
function AppProvider({ children }) {
  const modals = useSelector((state) => state.modals);
  const tasks = useSelector(tasksSelector.selectAll);

  const appProps = {
    modals,
    tasks,
  };
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
}
export { AppContext };
export { AppProvider };
