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
    if(this.state.inputCategory === 'Preço') {
        let newProducts = this.state.products.filter((product) => {
            if (product.price === this.state.inputValueMin && product.price === this.state.inputValueMax){
                return true
        })
    } else if (this.state.inputCategory === 'Categoria') {
        this.state.products.sort(function(a,b) {
            return a.category < b.category ? -1 : a.category > b.category ? 1 : 0
        })
    } else if (this.state.inputCategory === 'Nome') {
        this.state.products.sort(function(a,b) {
            return a.name < b.name ? -1 : a.nome > b.nome ? 1 : 0
        })
    }
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
    <div>
        <div>
        </div>
            <select onChange={inputCategory}>
            <option value={filteredList}>Nome</option>
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
