import Axios from "axios";
import React from "react";
import styled from 'styled-components';
import SearchAd from './SearchAd'



export default class ChoicePage extends React.Component {



    render (){
        return (
        
        <div>

        <button onClick={() => this.props.onClickChangePage('CreateAd')}>Fornecedor</button>

        <button onClick={() => this.props.onClickChangePage('SearchAd')}>Comprador</button>
            
        </div>
            
            
            )
            
        
    }
    
    }