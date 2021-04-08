import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;

  img{
    width: 270px;
    height: 200px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: space-between;
  height: 100%;
  p{
    margin: 4px 0;
    :nth-child(2){
      height: 58px;
      overflow: hidden;
    }
  }
  
`

const AddToCartButton = styled.button`
  align-self: center;
  margin-top: 4px;
`

const ContainerImg = styled.div`
  margin-top: 5px;
  width:300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    width: 15px;
    height: 40px;
    margin:0;
    padding: 0;
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover{
      background-color: #f8cd4f;
      opacity: 70%;
    }
  }

`

export default class CardProducts extends React.Component {
  state={
    numberPhoto: 0
  }

  onClickChangePhoto = (number)=>{
    if(this.props.product.photos.length>1){
      if(number<0 && this.state.numberPhoto>0){
        this.setState({numberPhoto: this.state.numberPhoto-1})
      }
      else if(number>0 && this.state.numberPhoto<this.props.product.photos.length-1){
        this.setState({numberPhoto: this.state.numberPhoto+1})
      }
      else if(number>0){
        this.setState({numberPhoto:0})
      }
      else{
        this.setState({numberPhoto:this.props.product.photos.length-1})
      }
    }
  }

    render() {
        const product = this.props.product;
        return(
            <CardContainer>
                <ContainerImg>
                  <p onClick={()=>this.onClickChangePhoto(-1)}>-</p>
                  <img src={product.photos[this.state.numberPhoto]}/>
                  <p onClick={()=>this.onClickChangePhoto(+1)}>+</p>
                </ContainerImg>
                <CardInfo>
                    <p><b>{product.name}</b></p>
                    <p>{product.description}</p>
                    <p>R${product.price},00</p>
                    <AddToCartButton onClick={() => this.props.onClickAddCart(product.id)}>Adicionar no carrinho</AddToCartButton>
                </CardInfo>
            </CardContainer>
        )
    }
}