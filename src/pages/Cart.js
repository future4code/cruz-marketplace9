import Axios from "axios";
import React from "react";
import styled from 'styled-components';
import SearchAd from './SearchAd'

export default class Cart extends React.Component {



    render (){
        return (
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.amount}x</p>
                <p>{this.props.price}</p>
                <button onClick={() => this.props.deleteCartProduct(this.props.id)}>
                    Remover item
                </button>
            </div>
        )
    }
}