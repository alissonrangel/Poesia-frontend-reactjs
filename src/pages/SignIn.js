import React, { useState , useEffect} from 'react';
import  { Link } from 'react-router-dom';
import { PageContainer, PageTitle, ErrorMessage } from '../components/MainComponents'
import useAPI from '../helpers/SiteAPI';
import { doLogin } from '../helpers/AuthHandler';
import styled from 'styled-components';
 
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

        input{
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

const SignIn = () => {

  const api = useAPI();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    setError('');
    
    const json = await api.login(email, password);

    if ( json.error){
      setError(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = '/';
    }
    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea >
        {error &&
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        <Link to="/" >Voltar para a HOME</Link>

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input 
                type="email" 
                disabled={disabled}
                required
                value={email}
                onChange={e=>setEmail(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input 
                type="password" 
                disabled={disabled}
                required
                value={password}
                onChange={e=>setPassword(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input 
                type="checkbox" 
                disabled={disabled}
                checked={rememberPassword}
                onChange={()=>setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>
          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer Login</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default SignIn;