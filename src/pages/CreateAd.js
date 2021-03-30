import axios from "axios";
import React from "react";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DivInputs = styled.div`
  border-bottom: 1px solid black;
`;
const Input = styled.input``;
const DivProducts = styled.div``;

class CreateAd extends React.Component {
  state = {
    inputName: "",
    inputDescription: "",
    inputPrice: "",
    inputPaymentMethod: "",
    inputCategory: "",
    inputPhotos: [],
    inputInstallments: "",
    products: [],
    inputSearchProduct: "",
  };

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/eloFourTwo/products"
      )
      .then((res) => {
        this.setState({ products: res.data.products });
      });
  };

  createProduct = () => {
    const body = {
      name: this.state.inputName,
      description: this.state.inputDescription,
      price: this.state.inputPrice,
      paymentMethod: this.state.inputPaymentMethod,
      category: this.state.inputCategory,
      photos: this.state.inputPhotos,
      installments: this.state.inputInstallments,
    };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/eloFourTwo/products",
        body
      )
      .then((res) => {
        this.setState({
          inputName: "",
          inputDescription: "",
          inputPrice: "",
          inputPaymentMethod: "",
          inputCategory: "",
          inputPhotos: "",
          inputInstallments: "",
        });
        alert("Seu produto já foi anunciado!");
      })
      .catch((err) => {
        this.setState({
          inputName: "",
          inputDescription: "",
          inputPrice: "",
          inputPaymentMethod: "",
          inputCategory: "",
          inputPhotos: "",
          inputInstallments: "",
        });
        alert("Ocorreu um erro! Estamos trabalhando para solucioná-lo!");
        console.log(err);
      });
  };

  handleName = (e) => {
    this.setState({ inputName: e.target.value });
  };
  handleDescription = (e) => {
    this.setState({ inputDescription: e.target.value });
  };
  handlePrice = (e) => {
    this.setState({ inputPrice: e.target.value });
  };
  handlePaymentMethod = (e) => {
    this.setState({ inputPaymentMethod: e.target.value });
  };
  handleCategory = (e) => {
    this.setState({ inputCategory: e.target.value });
  };
  handlePhotos = (e) => {
    this.setState({ inputPhotos: e.target.value });
  };
  handleInstallments = (e) => {
    this.setState({ inputInstallments: e.target.value });
  };
  handleSearch = (e) => {
    this.setState({inputSearchProduct: e.target.value})
  };

  removeProduct = (productId) => {
      const newProducts =
      this.state.products.filter((product) => {
          if(product.id === productId) {
              return false 
          } else {
              return true
          }
      })
      this.setState({products: newProducts})
  }

  deleteProduct = (productId) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/eloFourTwo/products/${productId}`
      )
      .then((res) => {
        alert("Esse produto foi deletado!");
        this.removeProduct(productId)
      });
  };

  filterProducts = () => {
        return this.state.products.filter((product) => this.state.inputSearchProduct ? (product.name.toLowerCase()).includes(this.state.inputSearchProduct.toLowerCase()) : true)
    }

  render() {
    const filteredList = this.filterProducts()

    return (
      <DivContainer>
        <DivInputs>
          <label>Nome do produto:</label>
          <Input value={this.state.inputName} onChange={this.handleName}/>
          <label>Descrição do produto</label>
          <Input
            value={this.state.inputDescription}
            onChange={this.handleDescription}
          />
          <label>Preço: </label>
          <Input value={this.state.inputPrice} onChange={this.handlePrice} />
          <label>Métodos de pagamento: </label>
          <Input
            value={this.state.inputPaymentMethod}
            onChange={this.handlePaymentMethod}
          />
          <label>Categoria: </label>
          <Input
            value={this.state.inputCategory}
            onChange={this.handleCategory}
          />
          <label>Fotos: </label>
          <Input value={this.state.inputPhotos} onChange={this.handlePhotos} />
          <label>Parcelas: </label>
          <Input
            value={this.state.inputInstallments}
            onChange={this.handleInstallments}
          />
          <button onClick={this.createProduct}>Criar produto</button>
        </DivInputs>

        <DivProducts>
          <h1>Meus produtos</h1>
          <Input value={this.state.inputSearchProduct} onChange={this.handleSearch}></Input>
          {filteredList.map((product) => {
            return (<div>
              <p>{product.name}</p>
              <button onClick={() => this.deleteProduct(product.id)}>
                Apagar produto
              </button>
            </div> ) 
          })}
        </DivProducts>
      </DivContainer>
    );
  }
}

export default CreateAd;
