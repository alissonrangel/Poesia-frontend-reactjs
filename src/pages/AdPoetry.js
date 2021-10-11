import React, { useState , useEffect, useRef} from 'react';
import  { Link, useHistory } from 'react-router-dom';
import { PageContainer, PageTitle, ErrorMessage } from '../components/MainComponents'
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

  const fileField = useRef();

  const history = useHistory();

  //const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  //const [category, setCategory] = useState('');  
  const [featuredImage, setFeaturedImage] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(0);

  const getUser = async()=>{   
    const json2 = await api.getUser()
    console.log("XXXXXXXXXXXXX row " + json2.me + " ID : "+json2.me.id);
    if (json2 == undefined){
      setUserId(0)
    } else {
      setUserId(json2.me.id)
    }
  }
  // useEffect(()=>{
  //   const getCategories = async ()=>{
  //     const cats = await api.getCategories();
  //     setCategories(cats);
  //   }
  //   getCategories();
  // },[])
  useEffect(async () => {
    await getUser();      
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);
    setError('');
    let errors = [];

    if(!title.trim()){
      errors.push('Sem título');
    }
    if(!body){
      errors.push('Sem corpo');
    }

    if ( errors.length === 0){
      const fData = new FormData();
      fData.append('user_id', userId);
      fData.append('title', title);
      fData.append('body', body);
      fData.append('featured_image', featuredImage);
      // fData.append('priceneg', priceNegotiable);
      //fData.append('image', 'default.png');
      //fData.append('cat', category);

      // if ( fileField.current.files.length > 0){
      //   for (let i = 0; i < fileField.current.files.length; i++) {
      //     fData.append('featured_image', fileField.current.files[i]);          
      //   }
      // }

      const json = await api.addPoetry(fData);

      console.log(json.error);
      
      if (!json.error){
        //history.push(`/ad/${json.id}`);
        console.log("dentro json error");
        
        history.push('/');
        return;
      } else {
        console.log("fora json error");
        setError(json.error);
      }

    } else{
      setError(errors.join('\n'));
    }


    
    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Postar uma Poesia</PageTitle>
      <PageArea >
        {error &&
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        <Link to="/" >Voltar para a HOME</Link>

        <form onSubmit={handleSubmit}>          
          <label className="area">
            <div className="area--title">Título</div>
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
          <label className="area">
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
          </label>
          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Adicionar Poesia</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default AdPoetry;