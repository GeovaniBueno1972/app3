import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Cartao from "./Cartao";
import axios from "axios";
import { now } from "moment";

export default function Card() {
  const [pedidos, setPedidos] = React.useState([]);

  const hoje = new Date(now());

  const baseApiUrl = "https://teste-backend-gb.herokuapp.com";

  async function loadPedidos() {
    const url = `${baseApiUrl}/pedidos`;
    const data = await axios.get(url);
    console.log(data.data.length)
    setPedidos(data.data);
  }
  
  function convertData(dataInput){
    let data = new Date(dataInput);
    let data1= new Date()
    data1.setDate(data.getDate()-1) 
    let dataFormatada = data1.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    return dataFormatada
  }

  React.useEffect(() => {
    loadPedidos();
    console.log(hoje);
  }, []);

  return (
    <>
    <div>
        teste {convertData(hoje)}
        {pedidos.length}
    </div>
    </>
  );
}
