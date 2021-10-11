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

  const [opcao,setOpcao] = useState("0")

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

  const handleOpcao = (op) => {
    setOpcao(op);
  }

  useEffect(async () => {
      await getPoetry();      
  }, []);

  useEffect(async() => {
    let corpo_poetry_page = document.getElementById('corpo_poetry_page')

    if (opcao == "0"){
      corpo_poetry_page.classList.remove("pre_poetry_page_cursive");
      corpo_poetry_page.classList.remove("pre_poetry_page_arial");
      corpo_poetry_page.classList.add("pre_poetry_page_default");
    } else if(opcao == "1"){
      corpo_poetry_page.classList.remove("pre_poetry_page_default");
      corpo_poetry_page.classList.remove("pre_poetry_page_arial");      
      corpo_poetry_page.classList.add("pre_poetry_page_cursive");
    } else if(opcao == "2"){
      corpo_poetry_page.classList.remove("pre_poetry_page_cursive");
      corpo_poetry_page.classList.remove("pre_poetry_page_default");      
      corpo_poetry_page.classList.add("pre_poetry_page_arial");
    }
  }, [opcao])

  return (
    <div className="container d-flex" style={{flexDirection:"column"}}>
      <h4>Poesia</h4>
      { logged && userId == poetry.user_id &&
        <button className="btn btn-sm btn-pink2 w-25" onClick={()=>handleButton()} >Editar</button>      
      }
      <br/>
      {/* <img className="imagem" src={ `${process.env.REACT_APP_URL_NAME}${poetry.key}`} alt="" /> */}
      <div style={{display: "flex", justifyContent:"space-between"}}><h6><strong>Autor: {poetry.user_name}</strong></h6><h6>{poetry.data_criacao}</h6></div>
      {/* <div>Autor: {poetry.user_name}</div> */}
      <div className="card-title poetryTitle d-flex justify-content-center">{poetry.title}</div>
      <div><pre id="corpo_poetry_page" className="card-text pre_poetry_page">{poetry.body}</pre></div> 
      
      <select className="mt-3 border-danger select_poetry_page" id="fontes" onChange={(e)=>handleOpcao(e.target.value)} >
        <option></option>
        <option value="0">Default</option>
        <option value="1">Cursive</option>
        <option value="2">Arial</option>
      </select>      
    </div>
  )
}

export default PoetryPage;