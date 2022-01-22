import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [user, setUser] = useState(initialState)
  const { authCtx } = useAppContext();

  function onChange(event) {
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const userLogin = async () => {
      let baseApiUrl = 'https://teste-backend-gb.herokuapp.com'
      const {data} = await axios.post(`${baseApiUrl}/signin`, user)
      authCtx.updateToken(data.token);
    }
  

  async function onSubmit(event) {
    event.preventDefault();
    
    console.log(`Valores: ${user.name}, ${user.password}`);
    await userLogin(user)
    if (authCtx.token) {
       console.log(axios.defaults.headers.common['Authorization'])    
      //return history.push('/')
    }

    setUser(initialState);
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form onSubmit={onSubmit} autoComplete="nope">
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="name"
            autoComplete="off"
            onChange={onChange}
            value={user.name}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={user.password}
          />
        </div>
        <button>Login</button>
      </form>
      <div>{authCtx.token}</div>
    </div>
  );
};

export default UserLogin;
