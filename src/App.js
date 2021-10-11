import './App.css';
import  {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditPoetry from './pages/EditPoetry';
import AdPoetry from './pages/AdPoetry';
import PoetryPage from './pages/PoetryPage';
import Home from './pages/Home';
import { isLogged, doLogout } from './helpers/AuthHandler';
import logo from "./assets/logo.png"
import header from "./assets/aguadecoco.png"

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
    <BrowserRouter >
        <header className="container">
        <img src={header} width="100%" alt="logo" />
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
              {/* <a class="navbar-brand" href="#">Navbar</a> */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" style={{padding: "0", margin:"0", display:"flex"}}>                  
                  <li className="nav-item">
                    <Link className="navbar-brand btn btn--dark" to="/" ><img src={logo} height="40px" alt="logo" /></Link>
                  </li>                  
                  { !logged &&
                  <>            
                    <li className="nav-item">
                      <Link className="btn btn--dark" to="/signin" >Login</Link>
                    </li>  
                    {/* <li className="nav-item">
                      <Link className="btn btn--dark" to="/signup" >Cadastrar</Link>
                    </li> */}
                  </>
                  }
                  { logged && 
                  <>  
                    <li>
                      <Link className="btn btn--dark" to="/addpoetry" >Adicionar Poesia</Link>
                    </li>                                        
                    <li>
                      <button className="btn btn--dark" onClick={handleLogout}>Sair</button>
                    </li>
                  </>
                  }
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <hr className="container"/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          {/* <Route path="/signup">
            <SignUp />
          </Route> */}
          <Route path="/poetries/:item">
            <PoetryPage />              
          </Route>
          <PrivateRoute path="/updatepoetry/:item">
            <EditPoetry />              
          </PrivateRoute>
          {/* <Route path="/poetries/:item">
            <PoetryPage author={i.user} title={i.title} body={i.body} key={i.key} />              
          </Route>   */}
          <PrivateRoute path="/addpoetry">
            <AdPoetry />
          </PrivateRoute>          
          <Route path="*">
            <h4>Página não encontrada</h4>
          </Route>
        </Switch>
        <hr className="container"/>
        <footer className="container"></footer>
      </BrowserRouter>
  );
}

export default App;
