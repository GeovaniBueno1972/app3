import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"
import {useAppContext} from "../../../data/hooks/hook"

export default function Header() {
  

  function fechar() {
    localStorage.removeItem("usuario_nome")
    localStorage.removeItem("pedidoAtual")
    localStorage.removeItem("usuario_funcao")
    localStorage.removeItem("usuario_id")
    localStorage.removeItem("length")
    delete axios.defaults.headers.common['Authorization']
    useAppContext.updateToken('')
  }

  const pathname = useLocation().pathname;

  function getButtonColor(path, pathname) {
    return path === pathname ? "info" : "primary";
  }

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar sx={{ gap: "20px" }}>
          {/* <Link to="/login">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/login", pathname)}
              sx={{ color: "white" }}
            >
              Login
            </Button>
          </Link> */}
          <Link to="/home">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/home", pathname)}
              sx={{ color: "white" }}
            >
              Home
            </Button>
          </Link>
          <Link to="/materiais">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/materiais", pathname)}
              sx={{ color: "white" }}
            >
              Materiais
            </Button>
          </Link>
          <Link to="/usuarios">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/usuarios", pathname)}
              sx={{ color: "white" }}
            >
              Usuários
            </Button>
          </Link>
          <Link to="/pedidos">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/pedidos", pathname)}
              sx={{ color: "white" }}
            >
              Pedidos
            </Button>
          </Link>
          <Link to="/clientes">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/clientes", pathname)}
              sx={{ color: "white" }}
            >
              Clientes
            </Button>
          </Link>
          <Link to="/controlePedidos">
            <Button
              variant="contained"
              disableElevation
              color={getButtonColor("/controlePedidos", pathname)}
              sx={{ color: "white" }}
            >
              Controle de Pedidos
            </Button>
          </Link>
          <Link to="/login">
            <Button
              onClick={() =>fechar}
              variant="contained"
              disableElevation
              color={getButtonColor("/login", pathname)}
              sx={{ color: "white" }}
            >
              Sair
            </Button>
          </Link>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
