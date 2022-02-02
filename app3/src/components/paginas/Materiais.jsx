import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminMateriais from "../elementos/AdminMateriais";
import TabelaMateriais from "../elementos/TabelaMateriais";

const Materiais = () => {
  const [materiais, setMateriais] = useState([]);

  async function loadMateriais() {
    let baseApiUrl = "https://teste-backend-gb.herokuapp.com";
    const url = `${baseApiUrl}/materiais`;
    const data = await axios.get(url);
    setMateriais(data.data);
    console.log(data.data);
  }

  useEffect(() => {
    loadMateriais();
  }, []);

  return (
    <>
      <AdminMateriais materiais={materiais} setMateriais={setMateriais} />
      <hr></hr>
      <TabelaMateriais materiais={materiais} recarregar={loadMateriais} />
    </>
  );
};

export default Materiais;