import React from 'react'
import styled from "styled-components"

const Input = styled.input`
`
const DivContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export default class Filter extends React.Component {

state = {
    products: [],
    inputValueMin: '',
    inputValueMax: '',
    inputCategory: ''
}

componentDidMount() {
    this.setState({products: this.props.products})
    console.log(this.props.products)
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

onClickFilter = () => {
    let newProducts
    if(this.state.inputCategory === 'Preço') {
        newProducts = this.state.products.filter((product) => {
            if (product.price >= this.state.inputValueMin && product.price <= this.state.inputValueMax){
                return true
        }})
    } else if (this.state.inputCategory === 'Categoria') {
        newProducts = [...this.state.products]
        newProducts.sort(function(a,b) {
            return a.category < b.category ? -1 : a.category > b.category ? 1 : 0
        }) 
    } else if (this.state.inputCategory === 'Nome') {
        newProducts = [...this.state.products]
        newProducts.sort(function(a,b) {
            return a.name < b.name ? -1 : a.nome > b.nome ? 1 : 0
        })
    }
    console.log(newProducts)
    this.props.filter(newProducts)
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
            <select onChange={this.onChangeInputCategory}>
            <option value={"Nome"}>Nome</option>
            <option value={'Preço'}>Preço</option>
            <option value={'Categoria'}>Categoria</option>
            </select>
            <span>-</span>
            <Input 
            type="number"
            min="0"
            value={this.state.inputValueMin}
            onChange={this.onChangeInputValueMin}
            placeholder="Valor mínimo"
          />
          <span>-</span>
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