import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartao from "../elementos/cartoes/Cartao";
import { convertData } from "../elementos/funcoes";


const INIT_RESUMO_VALOR = {
  date: "",
  chapas: 0,
  cortes: 0,
  colagem: 0,
};

const INIT_RESUMOS = {
  1: INIT_RESUMO_VALOR,
  2: INIT_RESUMO_VALOR,
  3: INIT_RESUMO_VALOR,
  4: INIT_RESUMO_VALOR,
  5: INIT_RESUMO_VALOR,
  6: INIT_RESUMO_VALOR,
};

const Home = () => {
  const [dia, setDia] = useState(["", "", "", "", "", ""]);
  const [resumos, setResumos] = useState(INIT_RESUMOS);
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({});
  var resumo = { QTD_Chapas: 0, QTD_Cortes: 0, QTD_Colagem: 0 };
  var numero = "";
  const [total, setTotal] = useState([]);
 
  const hoje = new Date();
  const datas = {};

  const novo = () => {
    const novosPedidos = pedidos.filter(
      (item) => item.numero !== novoPedido.numero
    );
    setPedidos([...novosPedidos, novoPedido]);
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
    setTotal([]);
    setResumos(INIT_RESUMOS);
    datasPadrao();
    const url = `${baseApiUrl}/pedidos_pesquisa`;
    const res = await axios.post(url, datas);

    dia.forEach(async (d, i) => {
      res.data.forEach(async (data) => {
        if (convertData(data.data_entrega) === d) {
          let [chapasPorDia, cortesPorDia, colagemPorDia] = await loadProdutos(
            data.numero,
            i
          );
          setResumos((res) => {
            let newRes = { ...res };
            newRes[i + 1] = {
              ...newRes[i + 1],
              chapas: newRes[i + 1].chapas + chapasPorDia,
              cortes: newRes[i + 1].cortes + cortesPorDia,
              colagem: newRes[i + 1].colagem + colagemPorDia,
            };

            return newRes;
          });
        }
      });
      setResumos((res) => {
        let newRes = { ...res };
        newRes[i + 1] = { ...newRes[i + 1], date: d };

        return newRes;
      });
    });

    setPedidos(res.data);
  }

  async function loadProdutos(id) {
    const url = `${baseApiUrl}/materialpedidos/${id}`;

    let chapasPorDia = 0;
    let cortesPorDia = 0;
    let colagemPorDia = 0;

    let res = await axios.get(url);

    let produtos = res.data;

    produtos.forEach((element, i) => {
      switch (element.unidade) {
        case "CH": {
          chapasPorDia += element.quantidade;
          resumo = {
            ...resumo,
            QTD_Chapas: resumo.QTD_Chapas + element.quantidade,
          };
          break;
        }
        case "UN": {
          cortesPorDia += element.quantidade;
          resumo = {
            ...resumo,
            QTD_Cortes: resumo.QTD_Cortes + element.quantidade,
          };
          break;
        }
        case "ML": {
          colagemPorDia += element.quantidade;
          resumo = {
            ...resumo,
            QTD_Colagem: resumo.QTD_Colagem + element.quantidade,
          };
          break;
        }
      }
      let soma = resumo;

      setTotal((total) => [...total, soma]);
    });

    return [chapasPorDia, cortesPorDia, colagemPorDia];
  }

  function ajustarDatas() {
    const data = new Date();
    for (let index = 0; index < dia.length; index++) {
      let temp = new Date(data);
      dia[index] = convertData(temp.setDate(hoje.getDate() + (index - 2)));
    }
  }

  const controle = () => {
    ajustarDatas();
    loadPesquisa();
  };

  useEffect(() => {
    controle();
  }, []);

  return (
    <>
      <div className="vazio">
        <p></p>
      </div>
      <Box
        
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
            <div>Data {dia[0]} </div>
            <div></div>
            <Paper className="resumo" elevation={3}>
              <div>Num. de chapas: {resumos[1].chapas}</div>
              <div>Num. de cortes: {resumos[1].cortes}</div>
              <div>Num. de colagem: {resumos[1].colagem}</div>
            </Paper>

            {pedidos.map((pedido) => {
              let data = convertData(pedido.data_entrega);
              const igual = data === dia[0];
              return (
                <div >
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
            <div>Data {dia[1]}</div>
            <Paper className="resumo" elevation={3}>
              <div>Num. de chapas: {resumos[2].chapas}</div>
              <div>Num. de cortes: {resumos[2].cortes}</div>
              <div>Num. de colagem: {resumos[2].colagem}</div>
            </Paper>

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
            <Paper className="resumo" elevation={3}>
              <div>Num. de chapas: {resumos[3].chapas}</div>
              <div>Num. de cortes: {resumos[3].cortes}</div>
              <div>Num. de colagem: {resumos[3].colagem}</div>
            </Paper>
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
            <Paper  className="resumo" elevation={3}>
              <div>Num. de chapas: {resumos[4].chapas}</div>
              <div>Num. de cortes: {resumos[4].cortes}</div>
              <div>Num. de colagem: {resumos[4].colagem}</div>
            </Paper>
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
            <Paper className="resumo" elevation={3}>
              <div>Num. de chapas: {resumos[5].chapas}</div>
              <div>Num. de cortes: {resumos[5].cortes}</div>
              <div>Num. de colagem: {resumos[5].colagem}</div>
            </Paper>
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
            <Paper className="resumo" elevation={3}>
              <div>Num. de chapas: {resumos[6].chapas}</div>
              <div>Num. de cortes: {resumos[6].cortes}</div>
              <div>Num. de colagem: {resumos[6].colagem}</div>
            </Paper>
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
      

      
      <br />
    </>
  );
};

export default Home;
