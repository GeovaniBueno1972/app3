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

export default function AdminUsuarios(props) {
  const estadoInicial = {
    name: "",
    password: "",
    confirmPassword: "",
    id_funcao: 1,
  };

  const [usuario, setUsuario] = useState(estadoInicial);
  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function onChange(event) {
    const { value, name } = event.target;
    //if ([name] === "id_funcao") value = parseInt(value, 10);

    setUsuario({
      ...usuario,
      [name]: value,
    });
  }

  async function save() {
    console.log(usuario);
    let status = "";
    //let codigo = parseInt(usuario.id, 10);
    setUsuario({
      name: usuario.name,
      password: usuario.password,
      confirmPassword: usuario.confirmPassword,
      id_funcao: usuario.id_funcao,
    });
    await axios
      .post(`${baseApiUrl}/users`, usuario)
      .then((res) => {
        status = res.status;
        if(usuario.id_funcao === 1){
          usuario.id_funcao = 'Vendedor'
        }else if(usuario.id_funcao === 2){
          usuario.id_funcao = 'Operador'
        }else if(usuario.id_funcao === 3){
          usuario.id_funcao = 'Administracao'
        }
        console.log(usuario)
        const novoUsuario = [...props.usuarios, usuario];
        props.setUsuarios(novoUsuario);
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
    setUsuario(estadoInicial);
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
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Nome"
              variant="standard"
              name="name"
              onChange={onChange}
              value={usuario.name}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="funcao">Função</InputLabel>
            <Select
              fullWidth
              labelId="funcao"
              variant="standard"
              name="id_funcao"
              value={usuario.id_funcao}
              onChange={onChange}
            >
              <MenuItem value={1}>Vendedor</MenuItem>
              <MenuItem value={2}>Operador</MenuItem>
              <MenuItem value={3}>Administração</MenuItem>
            </Select>
          </Grid>
          <br />
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Senha"
              variant="standard"
              name="password"
              onChange={onChange}
              value={usuario.password}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Confirme a Senha"
              variant="standard"
              name="confirmPassword"
              onChange={onChange}
              value={usuario.confirmPassword}
            ></TextField>
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
