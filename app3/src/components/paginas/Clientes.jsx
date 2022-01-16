import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import ListaCliente from '../elementos/ListaCliente'

const Clientes = () => {
    const [clientes, setCliente] = useState([])

    async function loadClientes(){
        let baseApiUrl = 'https://teste-backend-gb.herokuapp.com'
        const url = `${baseApiUrl}/clientes`
        const data = await axios.get(url) 
        setCliente(data.data)
        console.log(data.data)
            
    }



    const listaClientes = clientes.map(
        (c)=> <ListaCliente nome={c.name} fone={c.fone}/>
        )


    return (
        <>
        <button onClick={() => loadClientes()}>Clientes</button>
        <p>{listaClientes}</p>
        </>
     );
}
 
export default Clientes;