import { useContext } from "react";
import { LoggedInContext } from "./LoggedInContext";

export const useLoggedIn = () => {
  const context = useContext(LoggedInContext);
  if (!context) {
    throw new Error("useLoggedIn must be used within a LoggedInProvider");
  }
  return context;
};
