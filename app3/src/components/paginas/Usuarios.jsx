import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminUsuarios from "../elementos/AdminUsuarios";
import Table from "../tabelas/Table";
import { toast } from "react-toastify";

const COLUMNS = [
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "funcao", label: "Função", minWidth: 170 },
];

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  async function loadUsuarios() {
    let baseApiUrl = "https://teste-producao1.herokuapp.com";
    const url = `${baseApiUrl}/users`;
    const data = await axios.get(url);
    setUsuarios(data.data);
  }

  function remove(usuario) {
    console.log(usuario);
    const baseApiUrl = "https://teste-producao1.herokuapp.com";
    const id = usuario.id;
    axios
      .delete(`${baseApiUrl}/users/${id}`)
      .then(() => {
        notify("success");
        loadUsuarios();
      })
      .catch();
  }

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Usuário excluido com sucesso!");
    } else {
      toast.error("");
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  return (
    <>
      <AdminUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />
      <hr></hr>
      <Table rows={usuarios} columns={COLUMNS} remove={remove} />
    </>
  );
};

export default Usuarios;
