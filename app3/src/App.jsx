import { useEffect, useMemo } from "react";
import { Container } from "@mui/material";
import * as locales from "@mui/material/locale";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "../src/components/auth/Login";
import "./App.css";
import Header from "./components/elementos/Header/Header";
import Clientes from "./components/paginas/Clientes";
import ControlePedidos from "./components/paginas/ControlePedidos";
import Home from "./components/paginas/Home";
import Materiais from "./components/paginas/Materiais";
import Pedidos from "./components/paginas/Pedidos";
import Usuarios from "./components/paginas/Usuarios";
import { useAppContext } from "./data/hooks/hook";
import { ToastContainer } from "react-toastify";

export function App() {
  const theme = useTheme();
  const history = useHistory();

  const { authCtx } = useAppContext();

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales["ptBR"]),
    [theme]
  );

  useEffect(() => {
    if (authCtx.token === "nenhum token") {
      history.push("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={themeWithLocale}>
      <div className="App">
        {authCtx.token !== "nenhum token" && <Header />}
        <Container as="main" maxWidth="90%">
          <Switch>
            <Route path="/home" component={Home} />
            {authCtx.token === "nenhum token" && (
              <Route path="/login" component={Login} />
            )}
            <Route path="/materiais" component={Materiais} />
            <Route path="/usuarios" component={Usuarios} />
            <Route path="/pedidos" component={Pedidos} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/controlePedidos" component={ControlePedidos} />
          </Switch>
          <ToastContainer />
        </Container>
      </div>
    </ThemeProvider>
  );
}
