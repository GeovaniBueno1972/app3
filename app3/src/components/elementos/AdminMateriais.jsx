import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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
        if (props.materiais){
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}>
          <Grid item xs={2}>
            <TextField
              label="Código"
              variant="standard"
              name="codigo"
              type="number"
              onChange={onChange}
              value={material.codigo}
            ></TextField>
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Nome"
              variant="standard"
              name="nome"
              onChange={onChange}
              value={material.nome}
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="unidade">Unidade</InputLabel>
            <Select
              fullWidth
              labelId="unidade"
              variant="standard"
              name="unidade"
              value={material.unidade}
              onChange={onChange}
            >
              <MenuItem value={"CH"}>Chapa</MenuItem>
              <MenuItem value={"ML"}>Metro Linear</MenuItem>
              <MenuItem value={"UN"}>Unidade</MenuItem>
            </Select>
          </Grid>

          <Grid container justifyContent="flex-end" item xs={7}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => save()}>Salvar</Button>
              <Button onClick={() => limpar()}>Cancelar</Button>
              <Button>Editar</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
}
