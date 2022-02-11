import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './cartao.css'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '1px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export default function Cartao(props) {

  function convertData(dataInput){
    let data = new Date(dataInput);
    let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    return dataFormatada
  }


  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardContent className="card-content">
        <div id="num-pedido">{props.pedido.numero}</div>
        <div id="cliente-pedido">{props.pedido.cliente}</div>
        <div id="data-pedido">{convertData(props.pedido.data_entrega)}</div> 
      </CardContent>
      <CardActions>
        <Button size="small">Mais Informações</Button>
      </CardActions>
    </Card>
  );
}