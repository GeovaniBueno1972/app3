import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminClientes(props) {
  const estadoInicial = {
  id: 0,
  name: "",
  fone: "",
  bairro: "",
}

  const [cliente, setCliente] = useState(estadoInicial);
  const baseApiUrl = 'https://teste-producao1.herokuapp.com'

  function onChange(event) {
    const { value, name } = event.target;
    if ([name] === 'id') value = parseInt(value, 10)

    setCliente({
      ...cliente,
      [name]: value,
    });
  }

  async function saveCliente(){
    let codigo = parseInt(cliente.id, 10);
    setCliente({'id': codigo, 'name': cliente.name, 'fone': cliente.fone, 'bairro':cliente.bairro})
    axios.post(`${baseApiUrl}/clientes`, cliente)
    .then((res) => {
          console.log(res.status)
            toast.success('Cliente cadastrado com sucesso!');
            //const novoCliente = [...props.clientes, cliente]
            //props.setClientes(novoCliente)
          }
          )
    .catch((err) => {
      console.log(err)
      toast.error('Cliente não foi cadastrado! Verifique se o código já está em uso ou se todas as informações foram preenchidas')     
    })    
   
      
}

  const limpar = () => {setCliente(estadoInicial)}

      

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container  spacing={2} margin={3}>
        <Grid item xs={2}>
          
          <TextField
            label="Código"
            variant="standard"
            name="id"
            type="number"
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
            <Button onClick={() => saveCliente()}>Salvar</Button>
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
