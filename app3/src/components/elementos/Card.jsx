import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Cartao from "./Cartao";
import axios from "axios";
import { now } from "moment";
import "./card.css";

var load = false

function recarregar(){
  console.log(load)
    load = true;
  console.log(load)

}

export default function Card() {
  const [dia, setDia] = useState(["", "", "", "", "", ""]);
  const [pedidos, setPedidos] = useState([]);
  const [recarrega, setRecarrega] = useState(load)

  const hoje = new Date(now());
  const datas = {}

  

  const baseApiUrl = "https://teste-producao1.herokuapp.com";

 

  function datasPadrao(){
    let dataMenos = new Date()
    let dataMais = new Date()
    dataMenos.setDate(hoje.getDate()-5)
    dataMais.setDate(hoje.getDate()+20)
    datas.data_ini = dataMenos
    datas.data_fin = dataMais
}

  async function loadPesquisa(){
    datasPadrao()
    const url = `${baseApiUrl}/pedidos_pesquisa`;
    const data = await axios.post(url, datas)
    setPedidos(data.data)
  }

  function ajustarDatas() {
    let data = new Date();
    console.log(dia.length);
    for (let index = 0; index < dia.length; index++) {
      dia[index] = convertData(data.setDate(hoje.getDate() + (index - 2)));
      console.log(dia[index]);
      console.log(dia);
    }
  }


  function convertData(dataInput) {
    let data = new Date(dataInput);
    let dataFormatada = data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dataFormatada;
  }

  React.useEffect(() => {
    loadPesquisa();
    ajustarDatas();
    console.log(hoje);
  }, [load]);

  return (
    <>
      <Box
        className="box-config"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            padding: 1,
          },
        }}
      >
        <Paper elevation={3}>
          <div>
            Data {dia[0]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[0];
              return <div>{igual ? <Cartao pedido={pedido} recarrega={setRecarrega} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[1]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[1];
              return <div>{igual ? <Cartao pedido={pedido} recarrega={setRecarrega}/> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[2]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[2];
              return <div>{igual ? <Cartao pedido={pedido} recarrega={setRecarrega} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[3]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[3];
              return <div>{igual ? <Cartao pedido={pedido} recarrega={setRecarrega} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[4]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[4];
              return <div>{igual ? <Cartao pedido={pedido} recarrega={setRecarrega} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[5]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[5];
              return (
                <div>
                  {igual ? (
                    <div>
                      <Cartao pedido={pedido} recarrega={setRecarrega} />
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </Paper>
      </Box>
    </>
  );
}

export {recarregar}
