import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Box, TextField } from "@mui/material";

export default function AdminClientes(props) {
  const estadoInicial = {
    id: 0,
    name: "",
    fone: "",
    bairro: "",
  };

  const [cliente, setCliente] = useState(estadoInicial);
  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function onChange(event) {
    const { value, name } = event.target;
    if ([name] === "id") value = parseInt(value, 10);

    setCliente({
      ...cliente,
      [name]: value,
    });
  }

  async function saveCliente() {
    let codigo = parseInt(cliente.id, 10);
    setCliente({
      id: codigo,
      name: cliente.name,
      fone: cliente.fone,
      bairro: cliente.bairro,
    });
    axios
      .post(`${baseApiUrl}/clientes`, cliente)
      .then((res) => {
        console.log(res.status);
        toast.success("Cliente cadastrado com sucesso!");
        if (props.clientes) {
          const novoCliente = [...props.clientes, cliente];
          props.setClientes(novoCliente);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Cliente não foi cadastrado! Verifique se o código já está em uso ou se todas as informações foram preenchidas"
        );
      });
  }

  const limpar = () => {
    setCliente(estadoInicial);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap="20px" margin={3}>
        <Box display="flex" flexDirection="column" flexGrow={1} gap="10px">
          <Box display="flex" justifyContent="space-between" gap="20px">
            <TextField
              label="Código"
              variant="outlined"
              name="id"
              type="number"
              onChange={onChange}
              value={cliente.id}
            />
            <TextField
              fullWidth
              label="Nome"
              variant="outlined"
              name="name"
              onChange={onChange}
              value={cliente.name}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" gap="20px">
            <TextField
              label="Telefone"
              variant="outlined"
              name="fone"
              onChange={onChange}
              value={cliente.fone}
            />
            <TextField
              fullWidth
              label="Bairro"
              variant="outlined"
              name="bairro"
              onChange={onChange}
              value={cliente.bairro}
            />
          </Box>
        </Box>
        <Box display="flex" gap="5px">
          <Button
            variant="contained"
            color="success"
            onClick={() => saveCliente()}
          >
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
