import Axios from "axios";
import React from "react";
import styled from 'styled-components'

const CardProduct = styled.div`` //só para não dizer que não existe
const Filter = styled.div`` //só para não dizer que não existe
const Cart = styled.div`` //só para não dizer que não existe

const ContainerAll = styled.div`
   height: 100vh;
   display: grid;
   grid-template-rows: 70px 1fr;
`
const Header = styled.div`
   grid-row: 1/2;
   display: flex;
   align-items: center;
   justify-content: center;
`
const ContainerSecondary = styled.div`
   grid-row: 2/3;
   display: flex;
`
const ContainerProducts = styled.div``
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
         res = await Axios.get('https://us-central1-labenu-apis.cloudfunctions.net/eloFourTwo/products')
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
      for(let item of this.props.cartProducts){
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
      for(let i=0; i<this.state.cartProducts; i++){
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
      for(let i=0; i<this.state.products; i++){
         if(idProduct === this.state.products[i].id){
            newCartProducts = [...this.state.cartProducts, this.state.products[i]]
            newCartProducts[i].amount = 1
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
      if(productsFilteredInFilter.length===0){
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
               this.state.renderedProducts.map((product)=>{
                  return(
                     <CardProduct 
                        id = {product.id}
                        name = {product.name}
                        description = {product.description}
                        photos = {product.photos}
                        price = {product.price}
                        category = {product.category}
                        paymenthMethod = {product.paymenthMethod}
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
               <input value={this.state.inputSearchProduct}
               placeholder='Name of product'
               onChange={this.onChangeSearchProduct}
               />
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

