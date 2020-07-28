import React from 'react';
import * as api from '../services/api';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MiniCarrinho from './MiniCarrinho';
import Form from './Form';

class Busca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchCategoryName: '',
      searchCategoryId: '',
      respostaDaApi: [],
      produtosSelecionados: [],
    };
    this.starter = this.starter.bind(this);
    this.capturingText = this.capturingText.bind(this);
    this.capturingCategory = this.capturingCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    this.starter();
  }

  starter() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('produtos'));
    if (listaDeProdutos) {
      this.setState({ produtosSelecionados: listaDeProdutos });
    }
  }

  capturingText(event) {
    this.setState({ searchText: event.target.value });
  }

  capturingCategory(event) {
    this.setState({
      searchCategoryName: event.target.innerHTML,
      searchCategoryId: event.target.id,
    });
    api
      .getProductsFromCategoryAndQuery(
        this.state.searchCategoryId,
        this.state.searchText,
      )
      .then((resolve) => {
        this.setState({ respostaDaApi: resolve.results });
      });
  }

  handleClick(event) {
    api
      .getProductsFromCategoryAndQuery(
        this.state.searchCategoryId,
        this.state.searchText,
      )
      .then((resolve) => {
        this.setState({ respostaDaApi: resolve.results });
      });
    event.preventDefault();
  }

  handleCart(event) {
    const item = this.state.respostaDaApi.find(
      (produto) => produto.id === event.target.name);
    const cart = this.state.produtosSelecionados;
    cart.push(item);
    this.setState({ produtosSelecionados: cart });
    localStorage.setItem(
      'produtos',
      JSON.stringify(this.state.produtosSelecionados),
    );
  }

  render() {
    const { respostaDaApi, produtosSelecionados } = this.state;
    console.log(produtosSelecionados);
    return (
      <div className="d-flex">
        <div>
          {/* OT = OnText   OC= OnCategory  OS=OnSearch */}
          <Form
            OT={this.capturingText}
            OC={this.capturingCategory}
            OS={this.handleClick}
          />
        </div>
        <div>
          {respostaDaApi.map((produto) => (
            <div key={produto.id} data-testeid="product">
              <img src={produto.thumbnail} alt={produto.title} data-testid="product" />
              <h4 data-testeid="product">{produto.title}</h4>
              <p data-testeid="product">R${produto.price.toFixed(2)}</p>
              <input
                type="button"
                value="Adicionar"
                name={produto.id}
                onClick={this.handleCart}
                data-testid='product-add-to-cart'
              />
            </div>
          ))}
        </div>
        <MiniCarrinho lista={produtosSelecionados} />
      </div>
    );
  }
}

export default Busca;
