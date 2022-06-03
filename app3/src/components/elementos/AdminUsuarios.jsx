import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, TextField, Button, MenuItem } from "@mui/material";

export default function AdminUsuarios(props) {
  const estadoInicial = {
    name: "",
    password: "",
    confirmPassword: "",
    id_funcao: 1,
  };

  const [usuario, setUsuario] = useState(estadoInicial);
  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function onChange(event) {
    var { value, name } = event.target;
    if ([name] === "name") value = value.toUpperCase();

    setUsuario({
      ...usuario,
      [name]: value,
    });
  }

  async function save() {
    console.log(usuario);
    let status = "";
    //let codigo = parseInt(usuario.id, 10);
    setUsuario({
      name: usuario.name,
      password: usuario.password,
      confirmPassword: usuario.confirmPassword,
      id_funcao: usuario.id_funcao,
    });
    await axios
      .post(`${baseApiUrl}/users`, usuario)
      .then((res) => {
        status = res.status;
        if (usuario.id_funcao === 1) {
          usuario.id_funcao = "Vendedor";
        } else if (usuario.id_funcao === 2) {
          usuario.id_funcao = "Operador";
        } else if (usuario.id_funcao === 3) {
          usuario.id_funcao = "Administracao";
        }
        console.log(usuario);
        const novoUsuario = [...props.usuarios, usuario];
        props.setUsuarios(novoUsuario);
      })
      .catch((err) => {
        status = err.status;
      });
    if (status === 204) {
      notify("success");
    } else {
      notify("error");
    }
  }

  const limpar = () => {
    setUsuario(estadoInicial);
  };

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Usuário cadastrado com sucesso!");
    } else {
      toast.error(
        "Usuário não foi cadastrado! Verifique se o código já está em uso ou se todas as informações foram preenchidas"
      );
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" margin={3} gap="20px">
        <Box display="flex" flexDirection="column" flexGrow={1} gap="10px">
          <Box display="flex" justifyContent="stretch" gap="10px">
            <TextField
              fullWidth
              label="Nome"
              variant="outlined"
              name="name"
              onChange={onChange}
              value={usuario.name}
            />
            <TextField
              select
              fullWidth
              label="Função"
              variant="outlined"
              name="id_funcao"
              value={usuario.id_funcao}
              onChange={onChange}
            >
              <MenuItem value={1}>Vendedor</MenuItem>
              <MenuItem value={2}>Operador</MenuItem>
              <MenuItem value={3}>Administração</MenuItem>
            </TextField>
          </Box>

          <Box display="flex" justifyContent="stretch" gap="10px">
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              name="password"
              onChange={onChange}
              value={usuario.password}
            />
            <TextField
              fullWidth
              label="Confirme a Senha"
              variant="outlined"
              name="confirmPassword"
              onChange={onChange}
              value={usuario.confirmPassword}
            />
          </Box>
        </Box>
        <Box display="flex" gap="5px">
          <Button variant="contained" color="success" onClick={() => save()}>
            Salvar
          </Button>
          <Button variant="contained" color="error" onClick={() => limpar()}>
            Cancelar
          </Button>
          <Button variant="contained">Editar</Button>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
