import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminPedidos from "../elementos/AdminPedidos";
//import TabelaUsuarios from "../elementos/TabelaUsuarios";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);

  async function loadPedidos() {
    let baseApiUrl = "https://teste-backend-gb.herokuapp.com";
    const url = `${baseApiUrl}/users`;
    const data = await axios.get(url);
    setPedidos(data.data);
  }

  async function loadClientes() {
    let baseApiUrl = "https://teste-backend-gb.herokuapp.com";
    const url = `${baseApiUrl}/clientes`;
    const data = await axios.get(url);
    setClientes(data.data);
  }

  useEffect(() => {
    loadPedidos();
    loadClientes()
  }, []);

  return (
    <>
      <AdminPedidos pedidos={pedidos} setPedidos={setPedidos} clientes={clientes} />
      <hr></hr>
     
    </>
  );
};

export default Pedidos;
