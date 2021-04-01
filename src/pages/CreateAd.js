import axios from "axios";
import React from "react";
import styled from "styled-components";
import {Header} from "../components/Estilization"
import ChoicePage from "./ChoicePage"
import logo from "../img/logo.png"
import lixo from "../img/lixo.png"

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  margin: 10px 0px;
  padding: 10px;
  border-radius: 12px;
  outline: 0;
  border: none;
`;

const TextArea = styled.textarea`
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 12px;
  outline: 0;
  border: none;
  height: 40px;
`
const DivProducts = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  height: max(calc(100vh - 545px), 350px);
`;

const DivDelete = styled.div`
display: flex;
flex-direction: column;
  max-height: 270px;
  overflow: auto;
div{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}
`

const Select = styled.select`
  margin: 10px 0px;
  padding: 10px;
  border-radius: 12px;
  outline: 0;
  border: none;
`

const Span = styled.span`
`
const Lixo = styled.img`
  width: 20px;
  height: 20px;
:hover{
 cursor: pointer; 
}
`

const Imagem = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 12px;
  :hover{
 cursor: pointer; 
}
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

const BotaoCriar = styled.button`
  padding: 6px;
  border-radius: 12px;
  background-color: #F83940;
  border: none;
  color: black;
:hover{
 cursor: pointer; 
}
`

class CreateAd extends React.Component {
  state = {

    inputName: "",
    inputDescription: "",
    inputPrice: "",
    inputPaymentMethod: "",
    inputCategory: "",
    inputPhotos: "",
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
      photos: this.state.inputPhotos.split(","),
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
        console.log(err.response);
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
        <Header> 
           <Imagem onClick={() => this.props.onClickChangePage("ChoicePage")} src={logo}></Imagem>
          <h1> Elo4 </h1>
          <BotaoVoltar onClick={() => this.props.onClickChangePage("ChoicePage")} > Voltar </BotaoVoltar>   
        </Header>
        <DivInputs>
          <Input placeholder={"Nome do produto"} value={this.state.inputName} onChange={this.handleName}/>
          <TextArea
            placeholder={"Descrição do produto"} 
            value={this.state.inputDescription}
            onChange={this.handleDescription}
          />
          <Input min="1" value={this.state.inputPrice} onChange={this.handlePrice}  placeholder={"Preço"} type={"number"}/>

          <Select value={this.state.inputPaymentMethod} onChange={this.handlePaymentMethod}>
          <option>Forma de pagamento</option>
          <option>Boleto</option>
          <option>Cartão de Crédito</option>
          <option>Cartão de Débito</option>
          <option>PIX</option>
          </Select>

          <Select value={this.state.inputCategory}
            onChange={this.handleCategory}>
            <option>Selecione a categoria do seu produto</option>  
            <option>Roupa</option>
            <option>Artesanato</option>
            <option>Tricô</option>
            <option>Decoração</option>
            </Select>
          <Input value={this.state.inputPhotos} onChange={this.handlePhotos} placeholder={"Fotos do produto"}/>
          <Input
            min="1"
            max="12"
            type={"number"}
            placeholder={"Parcelas"}
            value={this.state.inputInstallments}
            onChange={this.handleInstallments}
          />
          <BotaoCriar onClick={this.createProduct}>Criar produto</BotaoCriar>
        </DivInputs>

        <DivProducts>
          <h1>Meus produtos</h1>
          <Input value={this.state.inputSearchProduct} onChange={this.handleSearch} placeholder={"Procure por seu produto"}></Input>
          <DivDelete>
          {filteredList.map((product) => {
            return (<div>
              <Span>{product.name}</Span>
              <Lixo onClick={() => this.deleteProduct(product.id)} src={lixo}></Lixo>
            </div> ) 
          })}
          </DivDelete>
        </DivProducts>
      </DivContainer>
    );
  }
}

export default CreateAd;
