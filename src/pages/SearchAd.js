import Axios from "axios";
import React from "react";
import styled from 'styled-components'
import CardProduct from '../components/CardProducts'
import Cart from '../components/Cart'
import {Header} from "../components/Estilization"
import logo from "../img/logo.png"

const Filter = styled.div`
   width: 20%;
   height: 100%;
` //só para não dizer que não existe

const ContainerAll = styled.div`
   height: 100vh;
   display: grid;
   grid-template-rows: 80px 1fr;
`

const Input = styled.input`
  margin: 10px 0px;
  padding: 10px;
  border-radius: 12px;
  outline: 0;
  border: none;
  width: 50%;
`;

const ContainerSecondary = styled.div`
   grid-row: 2/3;
   display: flex;
`
const ContainerProducts = styled.div`
   width: 60%;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   gap: 12px;
   height: 850px;
   overflow: scroll;
`

const Imagem = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 12px;

`
const BotaoVoltar = styled.button`
  margin-right: 12px;
  padding: 6px;
  border-radius: 12px;
  background-color: #F83940;
  border: none;
  color: black;
  width: 80px;
  outline: 0;
  :hover{
 cursor: pointer; 
}
`

export default class SearchAd extends React.Component{
   state={
      products: [],
      inputSearchProduct: '',
      productsFiltered: [],
      cartProducts: [],
   }

   componentDidMount(){
      this.getProducts();
   }

   //API
   getProducts = async ()=>{
      try{
         const res = await Axios.get('https://us-central1-labenu-apis.cloudfunctions.net/eloFourTwo/products')
         this.setState({
            products: res.data.products
         })
      }
      catch(erro){
         console.log('erro do getProduct SearchAd', erro)
      }
   }

   //Funções internas
   reciveTotalValue = () => {
      let totalValue = 0
      for(let item of this.state.cartProducts){
          totalValue += item.price* item.amount
      }
      return totalValue
  }

   //Interação com usuário
   onChangeSearchProduct= (e)=>{
      this.setState({
         inputSearchProduct: e.target.value
      })
   }

   onClickAddCart = (idProduct)=>{
      let newCartProducts

      //se o produto já existir no carrinho apenas aumenta a quantidde
      for(let i=0; i<this.state.cartProducts.length; i++){
         if(idProduct === this.state.cartProducts[i].id){
            newCartProducts = [...this.state.cartProducts]
            newCartProducts[i].amount++
            this.setState({
               cartProducts: newCartProducts
            })
            return
         }
      }

      //se o produto não existir no carrinho, adiciona ele no carrinho
      for(let i=0; i<this.state.products.length; i++){
         if(idProduct === this.state.products[i].id){
            newCartProducts = [...this.state.cartProducts, this.state.products[i]]
            newCartProducts[newCartProducts.length-1].amount = 1
            this.setState({
               cartProducts: newCartProducts
            })
            return
         }
      }
   }

   deleteCartProduct = (idProduct)=>{
      //se o produto coincidir com id e a quantidade ir a 0, o produto sairá do carrinho
      const newCartProducts = this.state.cartProducts.filter((product)=>{
         if(idProduct !== product.id) return true
         else{
            product.amount--
            if(product.amount >=1) return true
            else return false
         }
      })
      this.setState({
         cartProducts: newCartProducts
      })
   }

   filter = (productsFilteredInFilter)=>{
      this.setState({
         productsFiltered: productsFilteredInFilter
      })
   }

   //renderização dos produtos
   renderProducts = ()=>{
      let renderedProducts

      //se não existir nada no filtro então renderiza a partir de todos os produtos(this.state.products)
      if(this.state.productsFiltered.length===0){
         renderedProducts = this.state.products.filter((product)=>{
            if(product.name.toLowerCase().includes(this.state.inputSearchProduct))return true
            else return false
         })
      }
      //se existir algo no filtro então renderiza a partir dos produtos filtrados(this.state.productsFiltered)
      else{
         renderedProducts = this.state.productsFiltered.filter((product)=>{
            if(product.name.toLowerCase().includes(this.state.inputSearchProduct))return true
            else return false
         })
      }


      return(
         <ContainerProducts>
            {
               renderedProducts.map((product)=>{
                  return(
                     <CardProduct 
                        product = {product}
                        onClickAddCart = {this.onClickAddCart}
                     />
                  )
               })
            }
         </ContainerProducts>
      )
   }

   //renderização do carrinho
   renderCart = ()=>{
      return (
         <div>
            <h3>Carrinho:</h3>
            {
               this.state.cartProducts.map((product)=>{
                  return(
                     <Cart 
                     id = {product.id}
                     name = {product.name}
                     price = {product.price}
                     amount = {product.amount}
                     deleteCartProduct = {this.deleteCartProduct}
                     cartProducts = {this.state.cartProducts}
                     />
                  )
               })
            }
            <p>Valor total da compra: R${this.reciveTotalValue()},00</p>
         </div>
         )
   }

   render(){
      return(
         <ContainerAll>
            <Header> 
           <Imagem src={logo}></Imagem>
           <Input value={this.state.inputSearchProduct}
               placeholder='Procurar por produto'
               onChange={this.onChangeSearchProduct}
               />
          <BotaoVoltar onClick={() => this.props.onClickChangePage("ChoicePage")} > Voltar </BotaoVoltar>   
            </Header>
            <ContainerSecondary>
               <Filter 
                  products = {this.state.products}
                  filter = {this.filter}
               />
               {this.renderProducts()}
               {this.renderCart()}
            </ContainerSecondary>
         </ContainerAll>
      )
   }
}  

