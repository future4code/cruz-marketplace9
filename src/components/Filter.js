import React from 'react'

export default class Filter extends React.Component {

state = {
    products: [],
    inputValueMin: '',
    inputValueMax: '',
    inputCategory: ''
}

componentDidMount() {
    this.props.products
    this.setState({products: this.state.products})
}

filter() {
    showOrderedFilters = () => {
        if(this.props.minFilter > 0 || this.props.maxFilter > 0 ) {
        return this.props.products
          .filter((product) => this.props.maxFilter ? product.value <= this.props.maxFilter : false)
          .filter((product) => this.props.minFilter ? product.value >= this.props.minFilter : false)
        } else {
          return this.props.products
        }
      }
    
    this.props.filter(newProducts)
}


onChangeInputValueMin = (event) => {
    this.setState({inputValueMin: event.target.value})
}

onChangeInputValueMax = (event) => {
    this.setState({inputValueMax: event.target.value})
}

onChangeInputCategory = (event) => {
    this.setState({inputCategory: event.target.value)
}

onClickFilter() {
    const newProduct = [ 
        { inputValueMin: this.state.inputValueMin, 
          inputValueMax: this.state.inputValueMax, 
          inputCategory: this.state.inputCategory }
    ]
    this.props.filter(newProduct)
    //Vai criar um novo array que terá os produtos 
    //respeitando os requisitos de inputValueMin, inputValueMax, inputCategory. 
    //Depois disso, irá passar esse array como parâmetro para a função: this.props.filter(array)
}


render() {
    const filteredProducts = products
    .filter((product,index) => products.lastIndexOf(product) === index)
    .sort((a,b) => a < b ? -1 : 1)

    return (
    <div>
        <div>
        </div>
            <select value={this.state.sort}>
            <option value={filteredProducts}>Nome</option>
            <option value={'Preço'}>Preço</option>
            <option value={'Categoria'}>Categoria</option>
            </select>
            <span>-</span>
            <Input 
            type="number"
            min="0"
            value={this.props.minFilter}
            onChange={this.props.handleMinValue}
            placeholder="Valor mínimo"
          />
          <span>-</span>
          <Input 
            type="number"
            min="0"
            value={this.props.maxFilter}
            onChange={this.props.handleMaxValue}
            placeholder="Valor máximo"
          />
            <button onClick={this.props.filter(newProduct)}>Filtrar</button>
    </div>
    )
  }
    
}


