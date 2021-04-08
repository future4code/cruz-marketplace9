import Axios from "axios";
import React from "react";
import styled from 'styled-components';
import SearchAd from './SearchAd'
import logo from "../img/logo.png"

const DivContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const DivBotoes = styled.div`
    margin-top: 20px;
`

const BotaoVender = styled.button`
  padding: 20px;
  border-radius: 24px;
  background-color: #F83940;
  border: none;
  color: black;
  width: 200px;
  margin-right: 12px;
  outline: 0;
  :hover{
 cursor: pointer; 
}
`

const BotaoComprar = styled.button`
  padding: 20px;
  border-radius: 24px;
  background-color: #F8CD4F;
  border: none;
  color: black;
  width: 200px;
  outline: 0;
  :hover{
 cursor: pointer; 
}
`

const Imagem = styled.img`
    width: 30%;
    height: 50%;
`

export default class ChoicePage extends React.Component {
    render (){
        return (
        
        <DivContainer>
        <Imagem src={logo} />

        <DivBotoes>
        <BotaoVender onClick={() => this.props.onClickChangePage('CreateAd')}>Quero vender</BotaoVender>
        <BotaoComprar onClick={() => this.props.onClickChangePage('SearchAd')}>Quero comprar</BotaoComprar>
        </DivBotoes>

        </DivContainer>
            
            
            )
            
        
    }
    
    }