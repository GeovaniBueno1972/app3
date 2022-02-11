import React, { useState, useEffect } from "react";
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
import Input from "@material-ui/core/Input";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AdminClientes from './AdminClientes'
import MatPedidos from './MatPedidos'



export default function AdminPedidos(props) {
  const estadoInicial = {
    numero: 0,
    cliente_id: "",
    estado: "Aguardando",
  };

  const [pedido, setPedido] = useState(estadoInicial);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.recarregar()
  };

  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function onChange(event) {
    const { value, name } = event.target;
    //if ([name] === "id_funcao") value = parseInt(value, 10);

    setPedido({
      ...pedido,
      [name]: value,
    });
  }

  useEffect(() => {
    setPedido({
      ...pedido,
      data_entrega: agora(),
      user_id: localStorage.getItem("usuario_id"),
    });
  }, []);

  async function save() {
    axios
      .post(`${baseApiUrl}/pedidos`, pedido)
      .then((res) => {
        const novoPedido = [...props.pedidos, pedido];
        props.setPedidos(novoPedido);
        notify("success");
        props.setPedidoAtual(pedido.numero) 
      })
      .catch((err) => {
        notify("error");
      });
  }

  const limpar = () => {
    setPedido(estadoInicial);
  };

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Pedido cadastrado com sucesso!");
    } else {
      toast.error(
        "Pedido não foi cadastrado! Verifique se o código já está em uso ou se todas as informações foram preenchidas"
      );
    }
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

  const dia = new Date();
  const agora = () => {
    let dd = dia.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    let mm = dia.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    let yy = dia.getFullYear();
    let hoje = yy + "-" + mm + "-" + dd;
    return hoje;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}>
          <Grid item xs={1}>
            <TextField
              fullWidth
              label="Número Pedido"
              variant="standard"
              name="numero"
              type="number"
              onChange={onChange}
              value={pedido.numero ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="demo-mutiple-name-label">Cliente</InputLabel>
            <Select
              fullWidth
              labelId="demo-mutiple-name-label"
              name="cliente_id"
              value={pedido.cliente_id ?? ""}
              onChange={onChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {props.clientes.map((name) => (
                <MenuItem key={name.id} value={name.id}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={1.5}>
            <Button variant="contained" aria-label="outlined primary button" onClick={handleClickOpen}>
              Novo Cliente
            </Button>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Data de entrega"
              variant="standard"
              defaultValue={pedido.data_entrega}
              type="date"
              name="data_entrega"
              onChange={onChange}
              value={pedido.data_entrega}
            ></TextField>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={2.5}>
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


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" 
      maxWidth={"md"}>
        <DialogTitle id="form-dialog-title">Cadastro de Clientes</DialogTitle>
        <DialogContent >
          <AdminClientes />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
