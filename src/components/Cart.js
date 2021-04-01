import Axios from "axios";
import React from "react";
import styled from 'styled-components';

const DivContainer = styled.div`
    margin-left: 10px;
    margin-bottom: 5px;
    margin: 0 10px 5px 10px;
    padding: 0 10px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    div{
        :nth-child(1){
            display: flex;
            flex-direction:column;
            align-items: flex-start;
        }
        :nth-child(2){
            p{  
                text-align: center;
                border:0;
                width: 20px;
                cursor: pointer;
                :hover{
                    background-color: #f83940;
                    opacity: 70%;
                    border-radius: 5px;
                }
            }
        }
    }
`

export default class Cart extends React.Component {



    render (){
        return (
            <DivContainer>
                <div>
                    <p><b>{this.props.name}</b>  {this.props.amount}x</p>
                    <p>R${this.props.price},00</p>
                </div>
                <div>
                    <p onClick={() => this.props.deleteCartProduct(this.props.id)}>
                        <b>x</b>
                    </p>
                </div>
            </DivContainer>
        )
    }
}