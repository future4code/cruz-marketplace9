import Axios from "axios";
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

  deleteProduct = (productId) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/eloFourTwo/products/${productId}`
      )
      .then((res) => {
        alert("Esse produto foi deletado!");
        this.getProducts();
      });
  };

  render() {
    const listOfProducts = this.state.products.map((product) => (
      <div>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.paymentMethod}</p>
        <p>{product.category}</p>
        <p>{product.photos}</p>
        <p>{product.installments}</p>
        <button onClick={() => this.deleteProduct(product.id)}>
          Apagar produto
        </button>
      </div>
    ));

    return (
      <DivContainer>
        <DivInputs>
          <label>Nome do produto:</label>
          <Input value={this.state.inputName} onChange={this.handleName}>
            {" "}
          </Input>
          <label>Descrição do produto</label>
          <Input
            value={this.state.inputDescription}
            onChange={this.handleDescription}
          >
            {" "}
          </Input>
          <label>Preço: </label>
          <Input value={this.state.inputPrice} onChange={this.handlePrice}>
            {" "}
          </Input>
          <label>Métodos de pagamento: </label>
          <Input
            value={this.state.inputPaymentMethod}
            onChange={this.handlePaymentMethod}
          >
            {" "}
          </Input>
          <label>Categoria: </label>
          <Input
            value={this.state.inputCategory}
            onChange={this.handleCategory}
          >
            {" "}
          </Input>
          <label>Fotos: </label>
          <Input value={this.state.inputPhotos} onChange={this.handlePhotos}>
            {" "}
          </Input>
          <label>Parcelas: </label>
          <Input
            value={this.state.inputInstallments}
            onChange={this.handleInstallments}
          >
            {" "}
          </Input>
        </DivInputs>

        <DivProducts>
          <h1>Meus produtos</h1>
          {listOfProducts}
        </DivProducts>
      </DivContainer>
    );
  }
}

export default CreateAd;
