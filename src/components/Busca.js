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
      selecteds: [],
      quantity: 0,
    };
    this.starter = this.starter.bind(this);
    this.Text = this.Text.bind(this);
    this.Cat = this.Cat.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.apiRequest = this.apiRequest.bind(this);
  }

  componentDidMount() {
    this.starter();
  }

  starter() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('produtos'));
    if (listaDeProdutos) {
      this.setState({ selecteds: listaDeProdutos });
    }
  }

  Text(event) {
    this.setState({ searchText: event.target.value });
  }

  apiRequest() {
    api
      .getProductsFromCategoryAndQuery(
        this.state.searchCategoryId,
        this.state.searchText,
      )
      .then((resolve) => {
        this.setState({ respostaDaApi: resolve.results });
      });
  }

  async Cat(event) {
    await this.setState({
      searchCategoryName: event.target.innerHTML,
      searchCategoryId: event.target.id,
    });
    this.apiRequest();
  }

  handleClick(event) {
    this.apiRequest();
    event.preventDefault();
  }

  handleCart(event) {
    const item = this.state.respostaDaApi.find((produto) => produto.id === event.target.name)
    if (item.quantity) {
      item.quantity += 1;
    } else {
      item.quantity = 1;
    }
    const cart = this.state.selecteds;
    if (!this.state.selecteds.includes(item)) {
      cart.push(item);
    }
    this.setState({ selecteds: cart });
    localStorage.setItem(
      'produtos',
      JSON.stringify(this.state.selecteds),
    );
  }

  add(e) {
    const arr = this.state.selecteds;
    const item = arr.find((produto) => produto.id === e.target.value);
    const listId = arr.indexOf(item);
    arr.splice(listId, 1);
    item.quantity += 1;
    arr.splice(listId, 0, item);
    this.setState({ selecteds: arr });
    localStorage.setItem(
      'produtos',
      JSON.stringify(this.state.selecteds),
    );
  }

  subtract(e) {
    const arr = this.state.selecteds;
    const item = arr.find((produto) => produto.id === e.target.value);
    const listId = arr.indexOf(item);
    arr.splice(listId, 1);
    if (item.quantity - 1 > 0) {
      item.quantity -= 1;
      arr.splice(listId, 0, item);
    }
    this.setState({ selecteds: arr });
    localStorage.setItem(
      'produtos',
      JSON.stringify(this.state.selecteds),
    );
  }

  render() {
    return (
      <div className="d-flex">
        <div>
          <Form QC={this.state.selecteds.length} OT={this.Text} OC={this.Cat} OS={this.handleClick}/>
        </div>
        <div>
          {this.state.respostaDaApi.map((produto) => (
            <div key={produto.id} data-testid="product">
              <img src={produto.thumbnail} alt={produto.title} />
              <h4>{produto.title}</h4>
              <p>R${produto.price.toFixed(2)}</p>
              <input
                type="button"
                value="Adicionar"
                name={produto.id}
                onClick={this.handleCart}
                data-testid="product-add-to-cart"
              />
            </div>
          ))}
        </div>
        <div>
          {this.state.selecteds.map((cada) => (
            <MiniCarrinho key={cada.id} lista={cada} plus={this.add} minus={this.subtract}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Busca;
