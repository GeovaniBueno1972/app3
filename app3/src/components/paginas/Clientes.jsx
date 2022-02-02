import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminClientes from "../elementos/AdminClientes";
import TabelaCliente from "../elementos/TabelaClientes";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  async function loadClientes() {
    let baseApiUrl = "https://teste-backend-gb.herokuapp.com";
    const url = `${baseApiUrl}/clientes`;
    const data = await axios.get(url);
    setClientes(data.data);
  }

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <>
      <AdminClientes clientes={clientes} setClientes={setClientes} />
      <hr></hr>
      <TabelaCliente clientes={clientes} recarregar={loadClientes} />
    </>
  );
};

export default Clientes;
