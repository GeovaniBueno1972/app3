import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { agora, convertData } from "../elementos/funcoes";
import moment,{ now } from 'moment'
import axios from 'axios'
import TabelaPedidos from '../tabelas/TabelaPedidos'
import Button from "@mui/material/Button";

const ControlePedidos = () => {
  const baseApiUrl = "https://teste-producao1.herokuapp.com";

  const totalInicial = [
    { totalPedAguardando: 0 },
    { totalChapas: 0 },
    { totalCortes: 0 },
    { totalColagem: 0 },
  ];

  var datas = {}

 
  const onChange = (e) => {
    const {name} = e.target
    if (name === "data_inicial"){
     setDataIni(moment(e.target.value).format("YYYY-MM-DD"))
    } else if (name === "data_final"){
      setDataFin(moment(e.target.value).format("YYYY-MM-DD"))
    }
  }

  const pesquisarDatas = () => {
    setPadrao(false)
    console.log(padrao)
    loadPedidosPesquisa()
  }

  function datasPadrao(){
    let hoje = new Date(now())
    let dataMenos = new Date()
    let dataMais = new Date()
    dataMenos.setDate(hoje.getDate()-5)
    dataMais.setDate(hoje.getDate()+20)
    datas.data_ini = moment(dataMenos).format("YYYY-MM-DD")
    datas.data_fin = moment(dataMais).format("YYYY-MM-DD")
}
  const [dataIni, setDataIni] = useState(agora());
  const [dataFin, setDataFin] = useState(agora());
  const [totais, setTotais] = useState(totalInicial);
  const [pedidos, setPedidos] = useState([])
  const [padrao, setPadrao] = useState(true)

  const resetTotais = () => {
    setTotais(totalInicial);
  };

  function loadPedidosPesquisa() {
    resetTotais();
    if (padrao){
      datasPadrao()
    }else{
      datas.data_ini = dataIni
      datas.data_fin = dataFin
    }
    console.log(datas)
    const url = `${baseApiUrl}/pedidos_pesquisa`;
    axios.post(url, datas).then((res) => {
      const ped=res.data
      for (let i=0; i<ped.length; i++) {
        ped[i].data_lancamento = convertData(ped[i].data_lancamento)
        ped[i].data_entrega = convertData(ped[i].data_entrega)
      }
      setPedidos(ped);
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        var count = 0
        if (element.estado === "Aguardando") {
            count++
          setTotais({...totais, totalPedAguardando:count})
         }
      }
    });
  }

  useEffect(() => {
      loadPedidosPesquisa()
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}>
          <p>Escolha um intervalo para pesquisa:</p>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Data inicial"
              variant="standard"
              type="date"
              name="data_inicial"
              onChange={(e)=>onChange(e)}
              defaultValue={dataIni}
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Data final"
              variant="standard"
              type="date"
              name="data_final"
              onChange={(e)=>onChange(e)}
              defaultValue={dataFin}
            ></TextField>
          </Grid>
          <Grid item xs={1.5}>
            <Button variant="contained" aria-label="outlined primary button" onClick={()=> pesquisarDatas()}>
              Pesquisar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} margin={3}></Grid>
      </Box>
      <TabelaPedidos pedidos={pedidos} />
    </>
  );
};

export default ControlePedidos;
