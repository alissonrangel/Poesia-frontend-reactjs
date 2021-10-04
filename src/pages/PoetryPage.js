import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import  {useHistory, useParams, useLocation, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import useAPI from '../helpers/SiteAPI';
import { isLogged, doLogout } from '../helpers/AuthHandler';



function PoetryPage(props) {
  
  let api = useAPI();  
  let history = useHistory();
  let { item } = useParams();

  const handleButton = () => {
    history.replace(`/updatepoetry/${item}`);  
  }

  const [poetry, setPoetry] = useState({});
  const [userId, setUserId] = useState(0);
  const [logged, setLogged] = useState(isLogged)

  const getPoetry = async()=>{
    const json = await api.getPoetry(item);
    console.log("JSONFDFSDSDFSDF - " + json.user_name);
    setPoetry(json);
    const json2 = await api.getUser()
    console.log("XXXXXXXXXXXXX row " + json2 + " ID : "+json2);
    if (json2 == undefined){
      setUserId(0)
    } else {
      setUserId(json2.me.id)
    }
    //setPoetry({id:1, title:'lak', body:'aaaaa', user: 'Alisson'});
  }

  const getUser = async() => {
    const json = await api.getUser()
    console.log("XXXXXXXXXXXXX row " + json + " ID : "+json.id);
    if (json.id == undefined){
      setUserId(0)
    } else {
      setUserId(json.id)
    }
  }

  useEffect(async () => {
      await getPoetry();      
  }, []);

  // useEffect(async() => {
  //   await getUser()
  // }, [])

  return (
    <div className="container">
      <h4>Poesia</h4>
      { logged && userId == poetry.user_id &&
        <button className="btn btn-sm btn-dark" onClick={()=>handleButton()} >Editar</button>      
      }
      {/* <div className="itemImage">
        <img src={ `${process.env.REACT_APP_URL_NAME}${poetry.key}`} alt="" />          
      </div> */}
      {/* <div>Autor: {poetry.user_name}</div>
      <div className="poetryTitle">{poetry.title}</div>
      <pre className="poetryCorpo">{poetry.body}</pre> */}
      {/* <img className="card-img-top" src={ `${process.env.REACT_APP_URL_NAME}${poetry.key}`} alt="" />                     */}
      <div>Autor: {poetry.user_name}</div>
      <div className="card-title poetryTitle">{poetry.title}</div>
      <div><pre className="card-text pre_poetry_page">{poetry.body}</pre></div> 
    </div>
  )
}

export default PoetryPage;