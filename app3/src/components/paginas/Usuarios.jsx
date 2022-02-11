import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminUsuarios from "../elementos/AdminUsuarios";
import TabelaUsuarios from "../elementos/TabelaUsuarios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  async function loadUsuarios() {
    let baseApiUrl = 'https://teste-producao1.herokuapp.com';
    const url = `${baseApiUrl}/users`;
    const data = await axios.get(url);
    setUsuarios(data.data);
  }

  useEffect(() => {
    loadUsuarios();
  }, []);

  return (
    <>
      <AdminUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />
      <hr></hr>
      <TabelaUsuarios usuarios={usuarios} recarregar={loadUsuarios} />
    </>
  );
};

export default Usuarios;
