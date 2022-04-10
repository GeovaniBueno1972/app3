import {Switch, Route, Link} from 'react-router-dom'
import Materiais from './components/paginas/Materiais'
import Usuarios from './components/paginas/Usuarios'
import Pedidos from './components/paginas/Pedidos'
import Clientes from './components/paginas/Clientes'
import Home from './components/paginas/Home'
import ControlePedidos from './components/paginas/ControlePedidos'
import './App.css'
import Login from "../src/components/auth/Login"

export function App() {
  
  
  return (
    <div className="App">
      <header>
        <ul id="navegacao">
          <li className="login">
            <Link to="./login">Login</Link>
          </li>
          <li className="home">
            <Link to="./home">Home</Link>
          </li>
          <li className="materiais">
             <Link to="./materiais">Materiais</Link>
          </li>
          <li className="usuarios">
              <Link to="./usuarios">Usuários</Link>
          </li>
          <li className="pedidos">
            <Link to="./pedidos">Pedidos</Link>
          </li>
          <li className="clientes">
            <Link to="./clientes">Clientes</Link>
          </li>
          <li className="controlePedidos">
            <Link to="./controlePedidos">Controle de Pedidos</Link>
          </li>
        </ul>
        
       
        
      </header>
      <main>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/materiais" component={Materiais}/>
          <Route path="/usuarios" component={Usuarios}/>
          <Route path="/pedidos" component={Pedidos}/>
          <Route path="/clientes" component={Clientes}/>
          <Route path="/controlePedidos" component={ControlePedidos}/>
        </Switch>
      </main>
      
    </div>
  );
}
