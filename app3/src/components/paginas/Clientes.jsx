import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminClientes from "../elementos/AdminClientes";
import { toast } from "react-toastify";
import Table from "../tabelas/Table";

const COLUMNS = [
  { id: "id", label: "Código", minWidth: 20 },
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "fone", label: "Fone", minWidth: 170 },
  { id: "bairro", label: "Bairro", minWidth: 170 },
];

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  async function loadClientes() {
    let baseApiUrl = "https://teste-producao1.herokuapp.com";
    const url = `${baseApiUrl}/clientes`;
    const data = await axios.get(url);
    setClientes(data.data);
  }

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Cliente excluido com sucesso!");
    } else {
      toast.error("");
    }
  };

  function remove(cliente) {
    console.log(cliente);
    const baseApiUrl = "https://teste-producao1.herokuapp.com";
    const id = cliente.id;
    axios
      .delete(`${baseApiUrl}/clientes/${id}`)
      .then(() => {
        notify("success");
        loadClientes();
      })
      .catch();
  }

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <>
      <AdminClientes clientes={clientes} setClientes={setClientes} />
      <hr></hr>
      <Table columns={COLUMNS} rows={clientes} remove={remove} />
    </>
  );
};

export default Clientes;
