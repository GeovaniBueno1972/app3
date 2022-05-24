import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import ParaProducao from "../ParaProducao";
import { convertData } from "../funcoes";

import "./cartao.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Cartao(props) {
  const baseApiUrl = "https://teste-producao1.herokuapp.com";
  const numero = props.pedido.numero;
  const [produtos, setProdutos] = useState([]);
  const [concluidos, setConcluidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [fechado, setFechado] = useState(false);
  const [aberto, setAberto] = useState(false);

  async function loadProdutos() {
    let id = props.pedido.numero;
    let url = `${baseApiUrl}/materialpedidos/${id}`;
    const data = await axios.get(url);
    setProdutos(data.data);
  }

  async function loadConcluidos() {
    let id = props.pedido.numero;
    let url = `${baseApiUrl}/producao/${id}`;
    const data = await axios.get(url);
    setConcluidos(data.data);
  }

  async function concluir() {
    let url = `${baseApiUrl}/pedidos_concluido/${numero}`;
    await axios.put(url);
    let url2 = `${baseApiUrl}/concluido/${numero}`;
    await axios.put(url2);
    enviar();
    props.novo();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.novo();
  };

  const enviar = () => {
    let pedido = props.pedido;
    let pedidoAlterado = {};
    if (pedido.estado === "Aguardando") {
      pedidoAlterado = { ...pedido, estado: "Producao" };
    } else if (pedido.estado === "Producao") {
      pedidoAlterado = { ...pedido, estado: "Concluido" };
    }

    console.log(pedidoAlterado);
    props.setNovoPedido(pedidoAlterado);
  };

  useEffect(() => {
    loadProdutos();
    loadConcluidos();
    if (props.pedido.estado === "Concluido") {
      setFechado(true);
    }

    if (localStorage.getItem("usuario_funcao") === "3") {
      if (props.pedido.estado === "Aguardando") {
        setAberto(true);
      }
    }
  }, []);

  return (
    <>
      <div>
        {props.pedido.estado === "Aguardando" ? (
          <div>
            <Card className="cartao" sx={{ maxWidth: 250, backgroundColor: "#ccc" }}>
              <CardContent className="card-content">
                <div>{props.avo}</div>
                <div id="num-pedido">{props.pedido.numero}</div>
                <div id="cliente-pedido">{props.pedido.cliente}</div>
                <div id="data-pedido">
                  {convertData(props.pedido.data_entrega)}
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpen()}>
                  Mais Informações
                </Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {props.pedido.estado === "Producao" ? (
          <div>
            <Card sx={{ maxWidth: 250, backgroundColor: "#00BFFF" }}>
              <CardContent className="card-content">
                <div>{props.avo}</div>
                <div id="num-pedido">{props.pedido.numero}</div>
                <div id="cliente-pedido">{props.pedido.cliente}</div>
                <div id="data-pedido">
                  {convertData(props.pedido.data_entrega)}
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpen()}>
                  Mais Informações
                </Button>
                <Button size="small" onClick={() => concluir()}>
                  Concluir Produção
                </Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {props.pedido.estado === "Pendencia" ? (
          <div>
            <Card sx={{ maxWidth: 250, backgroundColor: "#F4A460" }}>
              <CardContent className="card-content">
                <div>{props.avo}</div>
                <div id="num-pedido">{props.pedido.numero}</div>
                <div id="cliente-pedido">{props.pedido.cliente}</div>
                <div id="data-pedido">
                  {convertData(props.pedido.data_entrega)}
                </div>
              </CardContent>
              <CardActions>
                <Button size="small">Mais Informações</Button>
                <Button size="small">Para Produção</Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {props.pedido.estado === "Concluido" ? (
          <div>
            <Card sx={{ maxWidth: 250, backgroundColor: "#0F0" }}>
              <CardContent className="card-content">
                <div>{props.avo}</div>
                <div id="num-pedido">{props.pedido.numero}</div>
                <div id="cliente-pedido">{props.pedido.cliente}</div>
                <div id="data-pedido">
                  {convertData(props.pedido.data_entrega)}
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpen()}>
                  Mais Informações
                </Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="parent-modal-title">Pedido: {props.pedido.numero}</h2>
          <p id="parent-modal-description">Cliente: {props.pedido.cliente}</p>
          <p id="parent-modal-description">Estado: {props.pedido.estado}</p>
          <p id="parent-modal-description">Itens do pedido:</p>
          <ul>
            {produtos.map((produtos) => {
              return (
                <div key={produtos.id}>
                  <li>
                    {produtos.quantidade} - {produtos.unidade} - {produtos.nome}
                  </li>
                </div>
              );
            })}
          </ul>
          <div>
            {aberto ? (
              <>
                <hr />
                <ParaProducao fechar={enviar} pedido={props.pedido.numero} />
              </>
            ) : (
              ""
            )}
            {fechado ? (
              <>
                <hr />
                {console.log(concluidos)}
                <p>
                  Início da Produção:{" "}
                  <strong>{convertData(concluidos.data_ini_producao)}</strong>
                </p>
                <p>
                  Operador de Produção: <strong>{concluidos.operador}</strong>
                </p>
                <p>
                  Término da Produção:{" "}
                  <strong>{convertData(concluidos.data_conclusao)}</strong>{" "}
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
