import React from "react";
import './ListaCliente.css'

export default function ListaCliente(props) { 
  return(
    <>
      <div className="container">
        <div className="codigo"></div>
        <div className="nome"> {props.nome} </div> 
        <div className="fone"> {props.fone} </div>

      </div>
    </>
  )

}
