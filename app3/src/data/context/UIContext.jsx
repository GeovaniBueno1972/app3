import { createContext, useState } from "react";

export const UIContext = createContext({
  message: "",
  updateMessage: (newMessage) => {},
});



export function UIProvider(props) {
  const [message, setMessage] = useState("test");

  return (
    <UIContext.Provider
      value={{ message, updateMessage: (newMessage) => setMessage(newMessage) }}
    >
      {props.children}
    </UIContext.Provider>
  );
}