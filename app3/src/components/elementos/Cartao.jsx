import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

import "./cartao.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Cartao(props) {
  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  const [produtos, setProdutos] = useState([]);

  async function loadProdutos() {
    let id = props.pedido.numero;
    let url = `${baseApiUrl}/materialpedidos/${id}`;
    const data = await axios.get(url);
    setProdutos(data.data);
  }

  useEffect(() => {
    loadProdutos();
  }, []);

  const estado= ()=>{
    let estado = props.pedido.estado
    if ((estado === 'Aguardando') || (estado === 'Pendencia')){
      return(
        <Button size="small" onClick={() => handleOpen()}>
        Para Produção
      </Button>
      )
    } else if (estado === 'Producao'){
      return(
        <Button size="small" onClick={() => handleOpen()}>
        Concluir Produção
      </Button>
      )
    }
  }


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function convertData(dataInput) {
    let data = new Date(dataInput);
    let dataFormatada = data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dataFormatada;
  }

  return (
    <>
      <div>
        {props.pedido.estado === "Aguardando" ? (
          <div>
            <Card sx={{ maxWidth: 250, backgroundColor: "#ccc" }}>
              <CardContent className="card-content">
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
        {props.pedido.estado === "Pendencia" ? (
          <div>
            <Card sx={{ maxWidth: 250, backgroundColor: "#F4A460" }}>
              <CardContent className="card-content">
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
        {props.pedido.estado === "Concluido" ? (
          <div>
            <Card sx={{ maxWidth: 250, backgroundColor: "#0F0" }}>
              <CardContent className="card-content">
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
        <Box sx={{ ...style, width: 400 }}>
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
            <hr />
            {estado()}

          </div>
        </Box>
      </Modal>
    </>
  );
}
