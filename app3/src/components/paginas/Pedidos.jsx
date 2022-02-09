import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminPedidos from "../elementos/AdminPedidos";
import MatPedidos from "../elementos/MatPedidos";
//import TabelaUsuarios from "../elementos/TabelaUsuarios";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pedidoAtual, setPedidoAtual] = useState('');

  const baseApiUrl = "'https://teste-producao1.herokuapp.com'";

  async function loadPedidos() {
    const url = `${baseApiUrl}/users`;
    const data = await axios.get(url);
    setPedidos(data.data);
  }

  async function loadClientes() {
    const url = `${baseApiUrl}/clientes`;
    const data = await axios.get(url);
    setClientes(data.data);
  }

  useEffect(() => {
    loadPedidos();
    loadClientes();
  }, []);

  return (
    <>
      <AdminPedidos
        pedidos={pedidos}
        setPedidos={setPedidos}
        clientes={clientes}
        recarregar={loadClientes}
        setPedidoAtual={setPedidoAtual}
      />
      <hr />
      {pedidoAtual ? <MatPedidos pedidoAtual={pedidoAtual} /> : ""}
    </>
  );
};

export default Pedidos;
