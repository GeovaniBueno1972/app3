import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

import AdminClientes from "./AdminClientes";
import MatPedidos from "./MatPedidos";

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
    props.recarregar();
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
        props.setPedidoAtual(pedido.numero);
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
      <Box
        display="flex"
        margin={3}
        alignItems="center"
        gap="20px"
        justifyContent="stretch"
      >
        <TextField
          label="Número Pedido"
          variant="outlined"
          name="numero"
          type="number"
          onChange={onChange}
          value={pedido.numero ?? 0}
        ></TextField>
        <Box
          display="flex"
          flexGrow={1}
          width="25%"
          justifyContent="stretch"
          alignItems="center"
          gap="5px"
        >
          <TextField
            SelectProps={{ MenuProps: { ...MenuProps } }}
            select
            fullWidth
            variant="outlined"
            name="cliente_id"
            label="Cliente"
            flexGrow={1}
            value={pedido.cliente_id ?? ""}
            onChange={onChange}
            MenuProps={MenuProps}
          >
            {props.clientes.map((name) => (
              <MenuItem key={name.id} value={name.id}>
                {name.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            aria-label="outlined primary button"
            onClick={handleClickOpen}
          >
            Novo Cliente
          </Button>
        </Box>

        <TextField
          label="Data de entrega"
          variant="outlined"
          defaultValue={pedido.data_entrega ?? ""}
          type="date"
          name="data_entrega"
          onChange={onChange}
          value={pedido.data_entrega}
        />
        <Box display="flex" gap="5px" height="100%">
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={"md"}
      >
        <DialogTitle id="form-dialog-title">Cadastro de Clientes</DialogTitle>
        <DialogContent>
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
