import React, { useState , useEffect, useRef} from 'react';
import  {useHistory, useParams, useLocation, BrowserRouter, Switch, Route, Link} from 'react-router-dom';import { PageContainer, PageTitle, ErrorMessage } from '../components/MainComponents'
import useAPI from '../helpers/SiteAPI';
import styled from 'styled-components';

import { doLogin } from '../helpers/AuthHandler';

const PageArea = styled.div`
  
  form{
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px #999;

    .area{
      display:flex;
      align-items:center;
      padding: 10px;
      max-width: 500px;

      .area--title{
        width: 200px;
        text-align: right;
        padding-right: 20px;
        font-weight: bold;
        font-size: 14px;
      }

      .area--input{
        flex: 1;

        input, select, textarea{
          width: 100%;
          font-size: 14px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 3px;
          outline: 0;
          transition: all ease .4s;

          &:focus{
            border: 1px solid #333;
            color: #333;
            box-shadow: 0px 0px 3px #999;
          }
        }
        textarea{
          height: 150px;
          resize: none;
        }

        button{
          background-color: #0089ff;
          border: 0;
          outline: 0;
          padding: 5px 10px;
          border-radius: 4px;
          color: #fff;
          font-size: 15px;
          cursor: pointer;

          &:hover{
            background-color: #006fce;
          }
        }
      }

    }
  }
`;

const AdPoetry = () => {

  const api = useAPI();
  let { item } = useParams();

  const fileField = useRef();

  const history = useHistory();

  //const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState({});  
  const [userId, setUserId] = useState(0);
  const [poetryId, setPoetryId] = useState(0);
  const [featuredImage, setFeaturedImage] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const [poetry, setPoetry] = useState({});

  const getPoetry = async()=>{
    const json = await api.getPoetry(item);
    console.log("JSONFDFSDSDFSDF - " + json);
    //await setUser(json.user);
    setTitle(json.title);
    setBody(json.body);
    setUserId(json.user_id);
    setPoetryId(json.id);
    setFeaturedImage(json.featuredImage);
    setPoetry(json);
    await console.log(`idddd ${json.user_name}`);
    
    //setPoetry({id:1, title:'lak', body:'aaaaa', user: 'Alisson'});
  }

  useEffect(async () => {
    await getPoetry();
  }, []);

  // useEffect(()=>{
  //   const getCategories = async ()=>{
  //     const cats = await api.getCategories();
  //     setCategories(cats);
  //   }
  //   getCategories();
  // },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);
    setError('');
    let errors = [];

    if(!title.trim()){
      errors.push('Sem t??tulo');
    }
    if(!body){
      errors.push('Sem corpo');
    }
    console.log("poetryId"+poetryId);
    
    if ( errors.length === 0){
      const fData = new FormData();
      // fData.append('id', poetryId);
      // fData.append('user_id', userId);
      console.log(`${title} - ${body}`);
      
      fData.append('title', title);
      fData.append('body', body);
      // fData.append('featured_image', featuredImage);
      // fData.append('priceneg', priceNegotiable);
      //fData.append('image', 'default.png');
      //fData.append('cat', category);

      // if ( fileField.current.files.length > 0){
      //   for (let i = 0; i < fileField.current.files.length; i++) {
      //     fData.append('featured_image', fileField.current.files[i]);          
      //   }
      // }
      console.log("poetryId   22   "+poetryId); 
      const json = await api.poetryUpdate(fData, poetryId);

      console.log(json)
      
      if ( !json.error ){
        //history.push(`/ad/${json.id}`);
        console.log("dentro json error");
        
        history.push('/');
        setDisabled(false);
        return;
      } else {
        console.log("fora json error");
        setError(json.error);
      }      

    } else{
      setError(errors.join('\n'));
    }

    setDisabled(false);
    return;
  }

  return (
    <PageContainer>
      <PageTitle>Editar poesia</PageTitle>
      <PageArea >
        {error &&
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        <Link to="/" >Voltar para a HOME</Link>

        <form onSubmit={handleSubmit}>    
          <input type="hidden" value={poetryId} />       
          <input type="hidden" value={userId} />          
          <label className="area">
            <div className="area--title">T??tulo</div>
            <div className="area--input">
              <input 
                type="text" 
                disabled={disabled}
                required
                value={title}
                onChange={e=>setTitle(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Corpo</div>
            <div className="area--input">
              <textarea                                  
                disabled={disabled}
                required
                value={body}
                onChange={e=>setBody(e.target.value)} 
              />
            </div>
          </label>          
          {/* <label className="area">
            <div className="area--title">Imagem</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disabled}
                required
                accept="image/*"
                multiple={false}
                ref={fileField}
                onChange={(e)=>setFeaturedImage(e.target.files[0])}                                
              />
            </div>
          </label> */}
          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Atualizar Poesia</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default AdPoetry;