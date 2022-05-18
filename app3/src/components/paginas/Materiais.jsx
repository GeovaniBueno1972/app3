import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminMateriais from "../elementos/AdminMateriais";
import Table from "../tabelas/Table";
import { toast} from "react-toastify";

const COLUMNS = [
  { id: "codigo", label: "Código", minWidth: 20 },
  { id: "nome", label: "Nome", minWidth: 200 },
  { id: "unidade", label: "unidade", minWidth: 20 },
];

const Materiais = () => {
  const [materiais, setMateriais] = useState([]);

  async function loadMateriais() {
    let baseApiUrl = "https://teste-producao1.herokuapp.com";
    const url = `${baseApiUrl}/materiais`;
    const data = await axios.get(url);
    setMateriais(data.data);
  }

  function remove(material) {
    console.log(material);
    const baseApiUrl = "https://teste-producao1.herokuapp.com";
    const id = material.codigo;
    axios
      .delete(`${baseApiUrl}/materiais/${id}`)
      .then(() => {
        notify("success");
        loadMateriais();
      })
      .catch();
  }

  const notify = (tipo) => {
    if (tipo === "success") {
      toast.success("Material excluido com sucesso!");
    } else {
      toast.error("");
    }
  };

  useEffect(() => {
    loadMateriais();
  }, []);

  return (
    <>
      <AdminMateriais materiais={materiais} setMateriais={setMateriais} />
      <hr></hr>
      <Table columns={COLUMNS} remove={remove} rows={materiais} />
    </>
  );
};

export default Materiais;
