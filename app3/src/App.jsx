import {Switch, Route, Link} from 'react-router-dom'
import Materiais from './components/paginas/Materiais'
import Usuarios from './components/paginas/Usuarios'
import Pedidos from './components/paginas/Pedidos'
import Clientes from './components/paginas/Clientes'

import Login from "../src/components/auth/Login"

export function App() {
  
  
  return (
    <div className="App">
      <header>
        <Link to="./login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="./materiais">Materiais</Link>
        <Link to="./usuarios">Usuários</Link>
        <Link to="./pedidos">Pedidos</Link>
        <Link to="./clientes">Clientes</Link>
      </header>
      <main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/materiais" component={Materiais}/>
          <Route path="/usuarios" component={Usuarios}/>
          <Route path="/pedidos" component={Pedidos}/>
          <Route path="/clientes" component={Clientes}/>
        </Switch>
      </main>
      
    </div>
  );
}
