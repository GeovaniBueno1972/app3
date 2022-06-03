import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Input from "@material-ui/core/Input";
import ButtonGroup from "@mui/material/ButtonGroup";
import {agora} from '../elementos/funcoes'


const Paraproducao = (props) => {
  const dia = new Date();
  
  const estadoInicial = {
    data_ini_producao: dia,
    user_id: "",
    pedido_numero: props.pedido,
    //data_conclusao: ""
  };

  
  const [operadores, setOperadores] = useState([]);
  const [pedido, setPedido] = useState(estadoInicial);

  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  async function loadOperadores() {
    let url = `${baseApiUrl}/operador`;
    const data = await axios.get(url);
    setOperadores(data.data);
  }

  function onChange(event) {
    const { value, name } = event.target;

    setPedido({
      ...pedido,
      [name]: value,
    });
  }

  

  useEffect(() => {
    loadOperadores();
  }, [pedido]);

  async function save() {
    console.log(pedido)
    let id = pedido.pedido_numero
    let insPedido = await axios.put(`${baseApiUrl}/pedidos_producao/${id}`)
    
    const data = await axios.post(`${baseApiUrl}/producao`, pedido)
    
    props.fechar()   
  }

  const cancel = () => {
    setPedido({...pedido, operador:""})
  }

  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Data inicio da Produção"
              variant="standard"
              defaultValue={agora()}
              name="data_ini_producao"
              type="date"
              onChange={onChange}
              value={agora() ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="demo-mutiple-name-label">Operador</InputLabel>
            <Select
              fullWidth
              labelId="demo-mutiple-name-label"
              name="user_id"
              value={pedido.user_id ?? ""}
              onChange={onChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {operadores.map((name) => (
                <MenuItem key={name.id} value={name.id}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid container justifyContent="flex-end" item xs={4}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => save()}>Salvar</Button>
              <Button onClick={() => cancel()}>Cancelar</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Paraproducao;
