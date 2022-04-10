import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { agora, convertData } from "../elementos/funcoes";
import moment, { now } from "moment";
import axios from "axios";
import TabelaPedidos from "../tabelas/TabelaPedidos";
import Button from "@mui/material/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const ControlePedidos = () => {
  //Constantes
  const baseApiUrl = "https://teste-producao1.herokuapp.com";
  const totalInicial = [
    { totalPedAguardando: 0 },
    { totalChapas: 0 },
    { totalCortes: 0 },
    { totalColagem: 0 },
  ];

  //Estados
  const [dataIni, setDataIni] = useState(agora());
  const [dataFin, setDataFin] = useState(agora());
  const [totais, setTotais] = useState(totalInicial);
  const [pedidos, setPedidos] = useState([]);
  const [padrao, setPadrao] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({ name: "" });
  const [numPedido, setNumPedido] = useState({numero:""})
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  var datas = {};

  const onChange = (e) => {
    const { name } = e.target;
    if (name === "data_inicial") {
      setDataIni(moment(e.target.value).format("YYYY-MM-DD"));
    } else if (name === "data_final") {
      setDataFin(moment(e.target.value).format("YYYY-MM-DD"));
    } else if (name === "cliente_id") {
      setCliente({ name: e.target.value });
    } else if (name === "numero_pedido"){
      setNumPedido({numero: e.target.value});
    }
  };

  const pesquisarDatas = () => {
    setPadrao(false);
    console.log(padrao);
    loadPedidosPesquisa();
  };

  function datasPadrao() {
    let hoje = new Date(now());
    let dataMenos = new Date();
    let dataMais = new Date();
    dataMenos.setDate(hoje.getDate() - 5);
    dataMais.setDate(hoje.getDate() + 20);
    datas.data_ini = moment(dataMenos).format("YYYY-MM-DD");
    datas.data_fin = moment(dataMais).format("YYYY-MM-DD");
  }

  const resetTotais = () => {
    setTotais(totalInicial);
  };

  
  async function loadClientes() {
    const url = `${baseApiUrl}/clientes`;
    const data = await axios.get(url);
    setClientes(data.data);
  }

  function loadPedidosPesquisa(tipo="normal") {
    resetTotais();
    var url = ""
    var fator = ""
    if (padrao) {
      datasPadrao();
    } else {
      datas.data_ini = dataIni;
      datas.data_fin = dataFin;
    }
    console.log(datas);
    if(tipo === "normal") {
      url = `${baseApiUrl}/pedidos_pesquisa`;
      fator = datas
    }else if(tipo === "cliente"){
      url = `${baseApiUrl}/PedidoCliente`
      fator = cliente
    }else if(tipo === "numero") {
      url = `${baseApiUrl}/PedidoNumero`
      fator = numPedido
      console.log(numPedido);
    }
    
    axios.post(url, fator).then((res) => {
      const ped = res.data;
      for (let i = 0; i < ped.length; i++) {
        ped[i].data_lancamento = convertData(ped[i].data_lancamento);
        ped[i].data_entrega = convertData(ped[i].data_entrega);
      }
      setPedidos(ped);
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        var count = 0;
        if (element.estado === "Aguardando") {
          count++;
          setTotais({ ...totais, totalPedAguardando: count });
        }
      }
    });
  }

  useEffect(() => {
    loadPedidosPesquisa("normal");
    loadClientes();
  }, []);

  return (
    <>
      
      <div className="vazio">
        <p></p>
      </div>
      <div className="datas">
        <div id="titulo">
          <p>Escolha um intervalo para pesquisa:</p>
        </div>
        <div id="dataIni">
            <TextField
              fullWidth
              label="Data inicial"
              variant="standard"
              type="date"
              name="data_inicial"
              onChange={(e) => onChange(e)}
              defaultValue={dataIni}
            ></TextField>
        </div> 
        <div id="dataFin">
              <TextField
                  fullWidth
                  label="Data final"
                  variant="standard"
                  type="date"
                  name="data_final"
                  onChange={(e) => onChange(e)}
                  defaultValue={dataFin}
                ></TextField>
        </div>
        <div className="botao">
            <Button
              variant="contained"
              aria-label="outlined primary button"
              onClick={() => pesquisarDatas()}
            >
              Pesquisar
            </Button>
        </div> 
      </div>
      <div className="clientesPesquisa">
        <div id="escolha">
          <InputLabel id="demo-mutiple-name-label">Cliente</InputLabel>
          <Select
            fullWidth
            labelId="demo-mutiple-name-label"
            name="cliente_id"
            value={cliente.name ?? ""}
            onChange={onChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {clientes.map((name) => (
              <MenuItem key={name.id} value={name.name}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="botao">
          <Button
            variant="contained"
            aria-label="outlined primary button"
            onClick={() => loadPedidosPesquisa("cliente")}
          >
            Pesquisar
          </Button>
        </div>
      </div>

      <div className="numeroPesquisa">
        <div id="numero">
           <TextField
            label="Número do Pedido"
            variant="standard"
            type="number"
            name="numero_pedido"
            onChange={(e) => onChange(e)}
            defaultValue={numPedido}
          ></TextField>
        </div>
        <div className="botao">
          <Button
            variant="contained"
            aria-label="outlined primary button"
            onClick={() => loadPedidosPesquisa("numero")}
          >
            Pesquisar
          </Button>
        </div>
      </div>

      <div className="resultados">
        <p>Pedidos Aguardando: {totais.totalPedAguardando}</p>
      </div>
    
      <TabelaPedidos pedidos={pedidos} />
    </>
  );
};

export default ControlePedidos;
