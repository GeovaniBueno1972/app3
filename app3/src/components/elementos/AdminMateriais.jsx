import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MenuItem, Button, Box } from "@mui/material";

export default function AdminMateriais(props) {
  const estadoInicial = {
    codigo: 0,
    nome: "",
    unidade: "",
  };

  const [material, setMaterial] = useState(estadoInicial);
  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function onChange(event) {
    const { value, name } = event.target;
    if ([name] === "codigo") value = parseInt(value, 10);

    setMaterial({
      ...material,
      [name]: value,
    });
  }

  async function save() {
    console.log(material);
    let status = "";
    let codigo = parseInt(material.codigo, 10);
    setMaterial({
      codigo: codigo,
      nome: material.nome,
      unidade: material.unidade,
    });
    axios
      .post(`${baseApiUrl}/materiais`, material)
      .then((res) => {
        notify("success");
        if (props.materiais) {
          const novoMaterial = [...props.materiais, material];
          props.setMateriais(novoMaterial);
        }
      })
      .catch((err) => {
        notify("error");
      });
  }

  const limpar = () => {
    setMaterial(estadoInicial);
  };

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Material cadastrado com sucesso!");
    } else {
      toast.error(
        "Material não foi cadastrado! Verifique se o código já está em uso ou se todas as informações foram preenchidas"
      );
    }
  };

  return (
    <>
      <Box
        display="flex"
        margin={3}
        alignItems="center"
        gap="20px"
        justifyContent="stretch"
      >
        <TextField
          label="Código"
          variant="outlined"
          name="codigo"
          type="number"
          onChange={onChange}
          value={material.codigo}
        ></TextField>
        <TextField
          fullWidth
          label="Nome"
          variant="outlined"
          name="nome"
          onChange={onChange}
          value={material.nome}
        ></TextField>
        <TextField
          select
          label="Unidade"
          fullWidth
          labelId="unidade"
          variant="outlined"
          name="unidade"
          value={material.unidade}
          onChange={onChange}
        >
          <MenuItem value={"CH"}>Chapa</MenuItem>
          <MenuItem value={"ML"}>Metro Linear</MenuItem>
          <MenuItem value={"UN"}>Unidade</MenuItem>
        </TextField>
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
