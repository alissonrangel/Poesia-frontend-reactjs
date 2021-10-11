import React, { useState , useEffect} from 'react';
import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://127.0.0.1:3000';

const apiFetchFile = async (endpoint, body) => {
  
  let token = Cookies.get('token');

  console.log(body);
  if (token){
    console.log("Entrou");
    body.token = token;
    console.log(body);
  }
  

  //}
  console.log("BODY>TOKEN2");
  console.log(token);
  console.log(body);
  
  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',    
    headers:{
      'Authorization': token      
    },
    body
  });
  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchPost = async (endpoint, body) => {

  // if (!body.token){
  //   let token = Cookies.get('token');
  //   if(token){
  //     body.token = token;
  //   }
  // }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
  });

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchPut = async (endpoint, body, id) => {

  let token = Cookies.get('token');

  const res = await fetch(`${BASEAPI+endpoint}${id}`, {
    method: 'PUT',
    headers:{
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': token 
    },
    body
  });

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchGet = async (endpoint) => {

  // if (!body.token){
  //   let token = Cookies.get('token');
  //   if(token){
  //     body.token = token;
  //   }
  // }

  const res = await fetch(`${BASEAPI+endpoint}`); 

  const json = await res.json();

  // if ( json.notallowed) {
  //   window.location.href = '/signin';
  //   return;
  // }

  return json;
}
const apiFetchGet1 = async (endpoint, id) => {

  // if (!body.token){
  //   let token = Cookies.get('token');
  //   if(token){
  //     body.token = token;
  //   }
  // }
  console.log(`XXXXXXXXXX - ${BASEAPI+endpoint}${id.id}`);
  
  // let idd = parseInt(id);

  console.log(`XXXXXXXXXX - ${BASEAPI+endpoint}${id.id}`);

  const res = await fetch(`${BASEAPI+endpoint}${id.id}`); 

  const json = await res.json();

  // if ( json.notallowed) {
  //   window.location.href = '/signin';
  //   return;
  // }  

  console.log(json);

  return json;
}

const apiFetchGet2 = async (endpoint, tok) => {

  if (tok != 0){
        
  } else {

  }
  console.log("TOKENNNNNN : "+tok);
  

  const res = await fetch(`${BASEAPI+endpoint}`,{
      headers:{
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': tok 
      }
    }
  ); 

  const json = await res.json();

  // if ( json.notallowed) {
  //   window.location.href = '/signin';
  //   return;
  // }

  return json;
}

const SiteAPI = {
  login: async (email, password) =>{
    // fazer consulta ao WS
    const json = await apiFetchPost(
      '/signin',
      {email, password}
    );
    return json 
    // { error: 'Funcionalidade Imcompleta'};
  },

  register: async (name, email, password)=>{
    const json = await apiFetchPost(
      '/signup',
      {name, email, password}
    );
    return json;
  },

  userInfo: async () =>{
    // fazer consulta ao WS
    const json = await apiFetchGet(
      '/user/me'
    );
    return json 
    // { error: 'Funcionalidade Imcompleta'};
  },

  userUpdate: async (name, email, password, stateLoc)=>{
    const json = await apiFetchPut(
      '/user/me',
      {name, email, password, state:stateLoc}
    );
    return json;
  },



  getPoetries: async () => {
    const json = await apiFetchGet(
      '/listpoetries'
    );
    return json;
  },

  getUser: async () => {

    let token = Cookies.get('token');
    
    console.log(token);
    
    if(token){
      console.log("Entrou aqui");
      //fData.append('Authorization', token);
    } else {
      console.log("Sem token");
      token = 0
      return;
    }

    const json = await apiFetchGet2(
      '/me',
      token
    );
    return json;
  },

  getPoetry: async (id) => {
    const json = await apiFetchGet1(
      '/poetries/',
      {id}
    );
    return json;
  },

  addPoetry: async (fData) => {
    
    let token = Cookies.get('token');
    
    console.log(token);
    if(token){
      console.log("Entrou aqui");
      //fData.append('Authorization', token);
    } else {
      console.log("Sem token");
      return;
    }
    console.log(`${fData.title} + ${fData.body}`);

    const json = await apiFetchFile(
      '/poetries',
      fData
    );
    return json;
  },

  poetryUpdate: async (fData, id)=>{
    
    let token = Cookies.get('token');
    console.log("akçmlkklxmdlknslkfnsdlml " + id);
    if(token){
      console.log("Entrou aqui 00");
      //fData.append('Authorization', token);
    } else {
      console.log("Sem token 00");
      return;
    }

    //console.log(`${fData.title} + ${fData.body} + ${fData.user_id}`);
    

    //return { error: "326"};
    
    const json = await apiFetchPut(
      '/poetries/',
      fData,
      id
    );
    return json;
  }

};

export default () => SiteAPI;