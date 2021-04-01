import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  p {
    margin: 4px 0;
  }
`

const AddToCartButton = styled.button`
  align-self: center;
  margin-top: 4px;
`

export default class CardProducts extends React.Component {
    render() {
        const product = this.props.product;
        return(
            <CardContainer>
                <img src={product.photos} />
                <CardInfo>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>R${product.price},00</p>
                    <AddToCartButton onClick={() => this.props.onClickAddCart(product.id)}>Adicionar no carrinho</AddToCartButton>
                </CardInfo>
            </CardContainer>
        )
    }
}