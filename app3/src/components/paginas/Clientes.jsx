import React from 'react';
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
//import ListaCliente from '../elementos/ListaCliente'
import AdminClientes from '../elementos/AdminClientes'
import TabelaCliente from '../elementos/TabelaClientes'

const Clientes = () => {
    const [clientes, setCliente] = useState([])

    async function loadClientes(){
        let baseApiUrl = 'https://teste-backend-gb.herokuapp.com'
        const url = `${baseApiUrl}/clientes`
        const data = await axios.get(url) 
        setCliente(data.data)
        console.log(data.data)
            
    }

    

    return (
        <>
        <AdminClientes clientes={clientes} setCliente={setCliente} />
        <Button color="success" variant="contained" onClick={() => loadClientes()}>Clientes</Button>
        
        <TabelaCliente clientes={clientes}/>
        </>
     );
}
 
export default Clientes;