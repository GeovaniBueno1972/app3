import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartao from "../elementos/cartoes/Cartao";
import { convertData, convertDataBanco } from "../elementos/funcoes";

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
  7: INIT_RESUMO_VALOR,
  8: INIT_RESUMO_VALOR,
  9: INIT_RESUMO_VALOR,
  10: INIT_RESUMO_VALOR,
};

const Home = () => {
  const [dia, setDia] = useState(["", "", "", "", "", "", "", "", "", ""]);
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
        if (convertDataBanco(data.data_entrega) === convertData(d)) {
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
        default: {
          resumo = { ...resumo };
        }
      }
      let soma = resumo;

      setTotal((total) => [...total, soma]);
    });

    return [chapasPorDia, cortesPorDia, colagemPorDia];
  }

  function ajustarDatas() {
    const temp = new Date();
    let valor = 2;
    if (hoje.getDay() === 0) {
      valor = 3;
    }
    dia[0] = temp.setDate(hoje.getDate() - valor);

    for (let index = 1; index < dia.length; index++) {
      let diaAtual = new Date(dia[index - 1]);
      if (diaAtual.getDay() === 6) {
        diaAtual.setDate(diaAtual.getDate() + 1);
      }
      dia[index] = temp.setDate(diaAtual.getDate() + 1);
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
        <div id="aguardando"><h3>AGUARDANDO</h3></div>
        <div id="producao"><h3>EM PRODUÇÃO</h3></div>
        <div id="concluido"><h3>CONCLUÍDO</h3></div>
        
      </div>
      <div className="teste" scrolling="auto">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              margin: "5px",
              padding: 1,
              border: "1px solid black",
            },
          }}
        >
          <Paper elevation={3}>
            <div>
              <div>Data {convertData(dia[0])} </div>
              <div></div>
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[1].chapas}</div>
                <div>Num. de cortes: {resumos[1].cortes}</div>
                <div>Num. de colagem: {resumos[1].colagem}</div>
              </Paper>

              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[0]);
                return (
                  <div>
                    {igual ? (
                      <Cartao
                        fechar={controle}
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
              <div>Data {convertData(dia[1])}</div>
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[2].chapas}</div>
                <div>Num. de cortes: {resumos[2].cortes}</div>
                <div>Num. de colagem: {resumos[2].colagem}</div>
              </Paper>

              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[1]);
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
              Data {convertData(dia[2])}
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[3].chapas}</div>
                <div>Num. de cortes: {resumos[3].cortes}</div>
                <div>Num. de colagem: {resumos[3].colagem}</div>
              </Paper>
              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[2]);
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
              Data {convertData(dia[3])}
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[4].chapas}</div>
                <div>Num. de cortes: {resumos[4].cortes}</div>
                <div>Num. de colagem: {resumos[4].colagem}</div>
              </Paper>
              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[3]);
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
              Data {convertData(dia[4])}
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[5].chapas}</div>
                <div>Num. de cortes: {resumos[5].cortes}</div>
                <div>Num. de colagem: {resumos[5].colagem}</div>
              </Paper>
              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[4]);
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
              Data {convertData(dia[5])}
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[6].chapas}</div>
                <div>Num. de cortes: {resumos[6].cortes}</div>
                <div>Num. de colagem: {resumos[6].colagem}</div>
              </Paper>
              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[5]);
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
          <Paper elevation={3}>
            <div>
              Data {convertData(dia[6])}
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[7].chapas}</div>
                <div>Num. de cortes: {resumos[7].cortes}</div>
                <div>Num. de colagem: {resumos[7].colagem}</div>
              </Paper>
              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[6]);
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
          <Paper elevation={3}>
            <div>
              Data {convertData(dia[7])}
              <Paper className="resumo" elevation={3}>
                <div>Num. de chapas: {resumos[8].chapas}</div>
                <div>Num. de cortes: {resumos[8].cortes}</div>
                <div>Num. de colagem: {resumos[8].colagem}</div>
              </Paper>
              {pedidos.map((pedido) => {
                let data = convertDataBanco(pedido.data_entrega);
                const igual = data === convertData(dia[7]);
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
      </div>
    </>
  );
};

export default Home;
