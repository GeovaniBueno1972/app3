import {Switch, Route, Link} from 'react-router-dom'
import Pg1 from './components/paginas/Pagina1'
import Pg2 from './components/paginas/Pagina2'
import Pg3 from './components/paginas/Pagina3'
import Clientes from './components/paginas/Clientes'

import Login from "../src/components/auth/Login"

export function App() {
  
  
  return (
    <div className="App">
      <header>
        <Link to="./login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="./pag1">Pagina 1</Link>
        <Link to="./pag2">Pagina 2</Link>
        <Link to="./pag3">Pagina 3</Link>
        <Link to="./Clientes">Clientes</Link>
      </header>
      <main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/pag1" component={Pg1}/>
          <Route path="/pag2" component={Pg2}/>
          <Route path="/pag3" component={Pg3}/>
          <Route path="/clientes" component={Clientes}/>
        </Switch>
      </main>
      
    </div>
  );
}
