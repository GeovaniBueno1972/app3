import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AdminMateriais from '../elementos/AdminMateriais'
import TabelaMatPedidos from '../tabelas/TabelaMatPedidos'


const MatPedidos = (props) => {
  const baseApiUrl = "https://teste-producao1.herokuapp.com";
  

  const [matPedido, setMatPedido] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [listaMatPedido, setListaMatPedido] = React.useState([])

  const estadoInicial = {
    pedido_numero: props.pedidoAtual,
    material_id: '',
    quantidade: 0,
  }

  
  function onChange(event) {
    const { value, name } = event.target;
    //if ([name] === "id_funcao") value = parseInt(value, 10);

    setMatPedido({
      ...matPedido,
      [name]: value,
    });
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    loadMateriais()
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  async function loadMateriais() {
    const url = `${baseApiUrl}/materiais`;
    const data = await axios.get(url);
    setMateriais(data.data);
  }

  async function loadMatPed(){
    const id = `${props.pedidoAtual}`
    console.log(id)
    const url = `${baseApiUrl}/materialpedidos/${id}`
    const matPed = await axios.get(url)
    setListaMatPedido(matPed.data);
    console.log(matPed.data)

  }

  async function save() {
    const url = `${baseApiUrl}/material_pedidos`;
    axios
      .post(url, matPedido)
      .then(()=> {
        notify("success");
        limpar()
        loadMatPed()
      })
      .catch((err) => {
        notify("error");
      })
  }

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Material cadastrado com sucesso!");
    } else {
      toast.error(
        "Material não foi cadastrado! Verifique se o código já está em uso ou se todas as informações foram preenchidas"
      );
    }
  };

  const limpar = () => {
    setMatPedido(estadoInicial);
  };

   useEffect(() => {
    loadMateriais();
    limpar();
   
    
  }, []);

  return (
    <>
      <Box noValidate sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}>
          
          <Grid item xs={5}>
            <InputLabel id="demo-mutiple-name-label">Material</InputLabel>
            <Select
              fullWidth
              labelId="demo-mutiple-name-label"
              name="material_id"
              value={matPedido.material_id ?? ""}
              onChange={onChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {materiais.map((name) => (
                <MenuItem key={name.codigo} value={name.codigo}>
                  {name.nome}
                </MenuItem>
              ))}
            </Select>
            
          </Grid>
          <Grid item xs={1.5}>
            <Button variant="contained" aria-label="outlined primary button" onClick={handleClickOpen}>
              Novo Material
            </Button>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Quantidade"
              variant="standard"
              name="quantidade"
              type="number"
              onChange={onChange}
              value={matPedido.quantidade}
            ></TextField>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={2.5}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => save()}>Salvar</Button>
              <Button onClick={()=> limpar()}>Cancelar</Button>
              <Button>Editar</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <hr />
      <TabelaMatPedidos pedidoAtual={matPedido.pedido_numero} listaMatPedido={listaMatPedido}
      recarregar={loadMatPed}/>
      
      <ToastContainer />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" 
      maxWidth={"md"}>
        <DialogTitle id="form-dialog-title">Cadastro de Materiais</DialogTitle>
        <DialogContent >
          <AdminMateriais />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
     
    </>
  );
};

export default MatPedidos;