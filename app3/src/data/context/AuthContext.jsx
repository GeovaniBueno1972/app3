import { createContext, useState } from "react";
import axios from 'axios'

export const AuthContext = createContext({
  token: "",
  updateToken: (newToken) => {},
});


export function AuthProvider(props) {
  const [token, setToken] = useState("nenhum token");

  function updateToken(newToken) {
    if (newToken !== "") {
      setToken(newToken);
      window.alert(`new token: ${newToken}`);
      axios.defaults.headers.common['Authorization'] = `bearer ${newToken}`
    } else {
      window.alert("invalid token");
      delete axios.defaults.headers.common['Authorization']
    }
  }

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}