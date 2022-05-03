import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Cartao from "../elementos/cartoes/Cartao";
import axios from "axios";
import { now } from "moment";
import { convertData, agora } from "../elementos/funcoes";
//import Card from '../elementos/Card'

const Home = () => {
  const [dia, setDia] = useState(["", "", "", "", "", ""]);
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({});
 

  const hoje = new Date();
  const datas = {};

  const novo = ()=>{
    const novosPedidos = pedidos.filter((item)=> item.numero !== novoPedido.numero)
    setPedidos([...novosPedidos, novoPedido])
    controle()
  };

  

  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  function datasPadrao() {
    let dataMenos = new Date();
    let dataMais = new Date();
    dataMenos.setDate(hoje.getDate() - 5);
    dataMais.setDate(hoje.getDate() + 20);
    datas.data_ini = dataMenos;
    datas.data_fin = dataMais;
  }

  async function loadPesquisa() {
    console.log("Tentando pegar os pedidos");
    datasPadrao();
    const url = `${baseApiUrl}/pedidos_pesquisa`;
    const data = await axios.post(url, datas);
    setPedidos(data.data);
  }

  function ajustarDatas() {
    const data = new Date();
    for (let index = 0; index < dia.length; index++) {
      let temp = new Date(data);
      dia[index] = convertData(temp.setDate(hoje.getDate() + (index - 2)));
    }
  }

  
  const controle = () => {
    console.log("entrou no controle");
    ajustarDatas();
    loadPesquisa();
  };

  useEffect(() => {
    controle();
    console.log("useEffect da página Home");
  }, []);

  const load = () => {
    return (
      <>
      <div className="vazio">
        <p></p>
      </div>
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
                return (
                  <div>
                    {igual ? (
                      <Cartao pedido={pedido} />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </Paper>
          <Paper elevation={3}>
            <div>
              Data {dia[1]}
              {pedidos.map((pedido) => {
                let data = convertData(pedido.data_entrega);
                const igual = data === dia[1];
                return (
                  <div>
                    {igual ? (
                      <Cartao
                        novo={novo}
                        setNovoPedido={setNovoPedido}
                        pedido={pedido}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </Paper>
          <Paper elevation={3}>
            <div>
              Data {dia[2]}
              {pedidos.map((pedido) => {
                let data = convertData(pedido.data_entrega);
                const igual = data === dia[2];
                return (
                  <div>
                    {igual ? (
                      <Cartao
                      novo={novo}
                        setNovoPedido={setNovoPedido}
                        pedido={pedido}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </Paper>
          <Paper elevation={3}>
            <div>
              Data {dia[3]}
              {pedidos.map((pedido) => {
                let data = convertData(pedido.data_entrega);
                const igual = data === dia[3];
                return (
                  <div>
                    {igual ? (
                      <Cartao
                      novo={novo}
                        setNovoPedido={setNovoPedido}
                        pedido={pedido}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </Paper>
          <Paper elevation={3}>
            <div>
              Data {dia[4]}
              {pedidos.map((pedido) => {
                let data = convertData(pedido.data_entrega);
                const igual = data === dia[4];
                return (
                  <div>
                    {igual ? (
                      <Cartao
                      novo={novo}
                        setNovoPedido={setNovoPedido}
                        pedido={pedido}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
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
                        {igual ? (
                          <Cartao
                          novo={novo}
                            setNovoPedido={setNovoPedido}
                            pedido={pedido}                            
                          />
                        ) : (
                          ""
                        )}
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
  };

  return <div>{load()}</div>;
};

export default Home;
