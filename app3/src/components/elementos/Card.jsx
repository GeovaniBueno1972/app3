import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Cartao from "./Cartao";
import axios from "axios";
import { now } from "moment";
import "./card.css";

export default function Card() {
  const [dia, setDia] = useState(["", "", "", "", "", ""]);
  const [pedidos, setPedidos] = useState([]);

  const hoje = new Date(now());

  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  async function loadPedidos() {
    const url = `${baseApiUrl}/pedidos`;
    const data = await axios.get(url);
    setPedidos(data.data);
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

  function renderizar() {
    for (let index = 0; index < dia.length; index++) {
      return (
        <Paper elevation={3}>
          <div>
            Data {dia[index]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[index];
              return (
                <div>
                  {igual ? (
                    <div>
                      <Cartao pedido={pedido} />
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
      );
    }
  }

  function convertData(dataInput) {
    let data = new Date(dataInput);
    let data1 = new Date();
    data1.setDate(data.getDate());
    let dataFormatada = data1.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dataFormatada;
  }

  React.useEffect(() => {
    loadPedidos();
    ajustarDatas();
    console.log(hoje);
  }, [dia]);

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
              return <div>{igual ? <Cartao pedido={pedido} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[1]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[1];
              return <div>{igual ? <Cartao pedido={pedido} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[2]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[2];
              return <div>{igual ? <Cartao pedido={pedido} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[3]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[3];
              return <div>{igual ? <Cartao pedido={pedido} /> : ""}</div>;
            })}
          </div>
        </Paper>
        <Paper elevation={3}>
          <div>
            Data {dia[4]}
            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[4];
              return <div>{igual ? <Cartao pedido={pedido} /> : ""}</div>;
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
                      <Cartao pedido={pedido} />
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
