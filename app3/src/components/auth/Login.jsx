import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useAppContext } from "../../data/hooks/hook";
import { useHistory } from "react-router-dom";
import "./Login.css";

const initialState = { name: "", password: "" };

/*
async function login({name, password}){
    
    
        await axios.post(`${baseApiUrl}/signin`, values)
            .then(res => {
                localStorage.setItem('__usuario', JSON.stringify(res.data))
               console.log({token: res.data.token})
               return {token: res.data.token}
              })
            .catch()
            
}
*/

const UserLogin = () => {
  const [user, setUser] = useState(initialState);
  const { authCtx } = useAppContext();
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const userLogin = async () => {
    let baseApiUrl = "https://teste-producao1.herokuapp.com";
    const { data } = await axios.post(`${baseApiUrl}/signin`, user);
    localStorage.setItem("usuario_id", data.id);
    localStorage.setItem("usuario_nome", data.name);
    localStorage.setItem("usuario_funcao", data.funcao);
    authCtx.updateToken(data.token);
  };

  async function onSubmit(event) {
    event.preventDefault();
    await userLogin(user);
    if (authCtx.token) {
      console.log(axios.defaults.headers.common["Authorization"]);
      return history.push("/home");
    }

    setUser(initialState);
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit} autoComplete="nope">
        <Box display="flex" flexDirection="column">
          <Typography variant="h3" color="primary" sx={{ margin: "40px auto" }}>
            Acessar o Sistema
          </Typography>
          <TextField
            id="user"
            type="text"
            name="name"
            autoComplete="off"
            onChange={onChange}
            value={user.name}
            label="Usuário"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={user.password}
            label="Senha"
            sx={{ marginBottom: "30px" }}
          />
        </Box>
        <Button variant="contained" size="large" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );

  // return (
  //   <div className="user-login">
  //     <h1 className="user-login__title">Acessar o Sistema</h1>
  //     <form onSubmit={onSubmit} autoComplete="nope">
  //       <div className="user-login__form-control">
  //         <label htmlFor="user">Usuário</label>
  //         <input
  //           id="user"
  //           type="text"
  //           name="name"
  //           autoComplete="off"
  //           onChange={onChange}
  //           value={user.name}
  //         />
  //       </div>
  //       <div className="user-login__form-control">
  //         <label htmlFor="password">Senha</label>
  //         <input
  //           id="password"
  //           type="password"
  //           name="password"
  //           onChange={onChange}
  //           value={user.password}
  //         />
  //       </div>
  //       <button>Login</button>
  //     </form>
  //   </div>
  // );
};

export default UserLogin;
