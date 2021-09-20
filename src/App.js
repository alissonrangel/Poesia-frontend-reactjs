import './App.css';
import  {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPoetry from './pages/AdPoetry';
import Home from './pages/Home';
import { isLogged, doLogout } from './helpers/AuthHandler';

const handleLogout = () => {
  doLogout();
  window.location.href = '/';
}

const PrivateRoute = ({children, ...rest}) => {
  return (
    <Route {...rest} >
      { isLogged ? children : <Redirect to="/signin" />}
    </Route>
  )
}

function App() {
  let logged = isLogged()

  return (
    <BrowserRouter>
        <header>
          <h1>Meu site legal</h1>
          <nav>
            <ul>
              <li>
                <Link to="/" >Home</Link>
              </li>
              { !logged &&
              <>            
                <li>
                  <Link to="/signin" >Login</Link>
                </li>  
                <li>
                  <Link to="/signup" >Cadastrar</Link>
                </li>
              </>
              }
              { logged && 
              <>  
                <li>
                  <Link to="/addpoetry" >Adicionar Poesia</Link>
                </li>                                        
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              </>
              }
            </ul>
          </nav>
        </header>
        <hr/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute path="/addpoetry">
            <AdPoetry />
          </PrivateRoute>          
          <Route path="*">
            <h4>Página não encontrada</h4>
          </Route>
        </Switch>
        <hr/>
        <footer>Todos os direitos reservados</footer>
      </BrowserRouter>
  );
}

export default App;
