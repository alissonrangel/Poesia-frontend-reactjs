import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import  {useHistory, useParams, useLocation, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import useAPI from '../helpers/SiteAPI';
import PoetryPage from '../pages/PoetryPage';
import './style.css';

function Home() {
  let api = useAPI();  

  let history = useHistory();

  const handleButton = (id) => {
      history.replace(`/poetries/${id}`);  
  }
  
  const [lista, setLista] = useState([]);

  const getPoetriesList = async()=>{
    const json = await api.getPoetries();
    console.log(json.poetries);
    setLista(json.poetries);
  }

  useEffect(() => {
    getPoetriesList();
  }, []);


  return (
    <div className="container">
      <h4>Poesias</h4>
      <ul style={{display: "flex", justifyContent:"space-between"}} className="row">
      {
        lista.map((i,k)=>                  
        <li className="li_home card p-2 m-2" key={k} >          
          {/* <img className="card-img-top" src={ `${process.env.REACT_APP_URL_NAME}${i.key}`} alt="" />                     */}
          <div style={{display: "flex", justifyContent:"space-between"}}><h6><strong>Autor: {i.user}</strong></h6><h6>{i.data_criacao}</h6></div>
          <div className="card-title mb-3">{i.title}</div>
          <div><pre className="card-text pre_home mb-3">{i.body}</pre></div>
          <button onClick={()=>handleButton(i.id)} className="btn btn-pink2">Leia mais</button>       
        </li>          
        )
      }
      </ul>
    </div>
  )
}

export default Home;