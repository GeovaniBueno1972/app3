import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";


export default function AdminClientes(props) {
  const estadoInicial = {
  id: "",
  name: "",
  fone: "",
  bairro: "",
}

  const [cliente, setCliente] = useState(estadoInicial);

  function onChange(event) {
    const { value, name } = event.target;

    setCliente({
      ...cliente,
      [name]: value,
    });
  }

  const limpar = () => {setCliente(estadoInicial)}


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container  spacing={2} margin={3}>
        <Grid item xs={2}>
          <TextField
            label="Código"
            variant="standard"
            name="id"
            onChange={onChange}
            value={cliente.id}
          ></TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            label="Nome"
            variant="standard"
            name="name"
            onChange={onChange}
            value={cliente.name}
          ></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Telefone"
            variant="standard"
            name="fone"
            onChange={onChange}
            value={cliente.fone}
          ></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Bairro"
            variant="standard"
            name="bairro"
            onChange={onChange}
            value={cliente.bairro}
          ></TextField>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={7}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Salvar</Button>
            <Button onClick={limpar}>Cancelar</Button>
            <Button>Editar</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
        
    </Box>
  );
}
