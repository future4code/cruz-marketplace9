import React from 'react'
import styled from "styled-components"

const Input = styled.input`
   width: 60%;
   margin-top: 5px;
`
const DivContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    select{
       width: 67%;
       margin-bottom: 5px;
    }
    button{
       margin-top: 10px;
       width: 67%;
    }
`
export default class Filter extends React.Component {

state = {
    products: [],
    inputValueMin: '',
    inputValueMax: '',
    inputCategory: '',
    inputOrder: '',
}

componentDidMount() {
    this.setState({products: this.props.products})
}

componentDidUpdate(){
    if(this.state.products !==this.props.products){
        this.setState({products: this.props.products})
    }
}

onChangeInputValueMin = (event) => {
    this.setState({inputValueMin: event.target.value})
}

onChangeInputValueMax = (event) => {
    this.setState({inputValueMax: event.target.value})
}

onChangeInputCategory = (event) => {
    this.setState({inputCategory: event.target.value})
}

onChangeInputOrder = (event)=>{
   this.setState({inputOrder: event.target.value})
}

onClickFilter = () => {
    let newProducts
    newProducts = this.state.products.filter((product)=>{
        if((product.price >=this.state.inputValueMin || this.state.inputValueMin==='')&&
        (product.price<=this.state.inputValueMax || this.state.inputValueMax===''))
        return true
        else return false
    })
    
    //ordenar os produtos, de preço menor maior, categoria ordem alfabética, nome ordem alfabética
    if(this.state.inputOrder === 'Preço'){
        newProducts.sort(function(a,b){
            return a.price - b.price;
        })
    }
    else if (this.state.inputOrder === 'Categoria') {
        // newProducts = [...this.state.products]
        newProducts.sort(function(a,b) {
            return a.category < b.category ? -1 : a.category > b.category ? 1 : 0
        }) 
    } 
    else if (this.state.inputOrder === 'Nome') {
        // newProducts = [...this.state.products]
        newProducts.sort(function(a,b) {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
        })
    }

    let newNewProducts
    if(this.state.inputCategory!==''){
       newNewProducts = newProducts.filter((product)=>{
          if(product.category===this.state.inputCategory) return true
          else return false
       })
       if(newNewProducts.length===0){
         alert('Não há produtos desta categoria em nossa loja.')
         this.setState({inputCategory: ''})
         newNewProducts = [...newProducts]
      }
    }
    else{
       newNewProducts = [...newProducts]
    }

    this.props.filter(newNewProducts)
    
}

render() {
    const filteredList = this.state.products.filter((item) => {
        if ((item.price >= this.state.minValue || this.state.minValue === '') && 
        (item.price <= this.state.maxValue || this.state.maxValue === '')) {
            return true 
        } else {
            return false
        }
    })

    return (
    <DivContainer>
            <select onChange={this.onChangeInputOrder} defaultValue='' value={this.state.inputOrder}>
               <option value=''>Ordenar por</option>
               <option value={'Nome'}>Nome</option>
               <option value={'Preço'}>Menor Preço</option>
               <option value={'Categoria'}>Categoria</option>
            </select>
            <select onChange={this.onChangeInputCategory} defaultValue='' value={this.state.inputCategory}>
               <option value=''>Filtrar por</option>
               <option value='Roupa'>Roupa</option>
               <option value='Artesanato'>Artesanato</option>
               <option value='Trico'>Trico</option>
               <option value='Decoraçao'>Decoração</option>
            </select>
            <Input 
                type="number"
                min="0"
                value={this.state.inputValueMin}
                onChange={this.onChangeInputValueMin}
                placeholder="Valor mínimo"
            />
            <Input 
                type="number"
                min="0"
                value={this.state.inputValueMax}
                onChange={this.onChangeInputValueMax}
                placeholder="Valor máximo"
            />
            <button onClick={this.onClickFilter}>Filtrar</button>
    </DivContainer>
    )
}
}