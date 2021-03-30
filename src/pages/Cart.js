import Axios from "axios";
import React from "react";
import styled from 'styled-components'
import SearchAd from './SearchAd'

export default class Cart extends React.Component {

reciveTotalValue = () => {
    let totalValue = 0
    for(let item of this.props.cartProducts){
        totalValue += item.price* item.amount
    }
    
    return totalValue
}

render (){
    return (
    
    <div>
        <h3>Carrinho:</h3>
        <div>
            <p>{this.props.name}</p>
            <p>{this.props.amount}x</p>
            <button onClick={() => this.props.deleteCartProduct(this.props.id)}>
                Remover item
            </button>
        </div>

        <p>Valor total da compra: R${this.reciveTotalValue()},00</p>
    </div>
        
        
        )
        
    
}

}