import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import  {useHistory, useParams, useLocation, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import useAPI from '../helpers/SiteAPI';
import { async } from 'q';

function Home() {
  let api = useAPI();
  let history = useHistory();

  const [lista, setLista] = useState([]);

  const getPoetriesList = async()=>{
    const json = await api.getPoetries();
    console.log(json.poetries);
    setLista(json.poetries);
  }

  useEffect(() => {
    getPoetriesList();
  }, []);

  const handleButton = () => {

    setTimeout(() => {
      history.replace('/sobre');  
    }, 2000);
    
  }

  return (
    <div>
      <h4>Poesias</h4>
      <ul>
      {
        lista.map((i,k)=>
          
        <li key={k}>
          <div className="itemImage">
            <img src={ `${process.env.REACT_APP_URL_NAME}${i.key}`} alt="" />          
          </div>
          <div>Autor: {i.user}</div>
          <div className="itemName">{i.title}</div>
          <div className="itemPrice">{i.body}</div>
        </li>
          
        )
      }
      </ul>
    </div>
  )
}

export default Home;