import React from 'react'

export default class Filter extends React.Component {

state = {
    products: [],
    inputValueMin: '',
    inputValueMax: '',
    inputCategory: ''
}

componentDidMount() {
    this.setState({products: this.props.products})
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

onClickFilter() {

    const newProducts = [ {products: this.state.products} ]
    this.props.filter(...newProducts)
}

render() {
    const filteredProducts = products
    .filter((product,index) => products.lastIndexOf(product) === index)
    .sort((a,b) => a < b ? -1 : 1)

    return (
    <div>
        <div>
        </div>
            <select onChange={inputCategory}>
            <option value={filteredProducts}>Nome</option>
            <option value={'Preço'}>Preço</option>
            <option value={'Categoria'}>Categoria</option>
            </select>
            <span>-</span>
            <Input 
            type="number"
            min="0"
            value={this.state.inputValueMin}
            onChange={onChangeInputValueMin}
            placeholder="Valor mínimo"
          />
          <span>-</span>
          <Input 
            type="number"
            min="0"
            value={this.props.inputValueMax}
            onChange={onChangeInputValueMax}
            placeholder="Valor máximo"
          />
            <button onClick={onClickFilter()}>Filtrar</button>
    </div>
    )
}


