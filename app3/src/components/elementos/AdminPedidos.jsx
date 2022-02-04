import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function AdminPedidos(props) {
  const estadoInicial = {
    numero: 0,
    data_entrega: "",
    user_id: 0,
    cliente_id: 0,
    estado: "Aguardando",
  };

  const [pedido, setPedido] = useState(estadoInicial);

  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function onChange(event) {
    const { value, name } = event.target;
    //if ([name] === "id_funcao") value = parseInt(value, 10);

    setPedido({
      ...pedido,
      [name]: value,
    });
  }

  async function save() {
    console.log(pedido);
    let status = "";
    //let codigo = parseInt(Pedido.id, 10);
    setPedido({
      numero: pedido.name,
      data_entrega: pedido.data_entrega,
      user_id: pedido.user_id,
      cliente_id: pedido.cliente_id,
    });
    await axios
      .post(`${baseApiUrl}/pedidos`, pedido)
      .then((res) => {
        status = res.status;
        console.log(pedido);
        const novoPedido = [...props.pedidos, pedido];
        props.setPedidos(novoPedido);
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
    setPedido(estadoInicial);
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Número Pedido"
              variant="standard"
              name="numero"
              type="number"
              onChange={onChange}
              value={pedido.numero}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={props.clientes.map((option) => option.name)}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Cliente" />
              )}
            />
          </Grid>
          <br />
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                name="data_entrega"
                value={pedido.data_entrega}
                onChange={ onChange }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Confirme a Senha"
              variant="standard"
              name="confirmPassword"
              onChange={onChange}
              value={""}
            ></TextField>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={7}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={save}>Salvar</Button>
              <Button onClick={limpar}>Cancelar</Button>
              <Button>Editar</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
}
