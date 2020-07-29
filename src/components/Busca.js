import React from 'react';
import * as api from '../services/api';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MiniCarrinho from './MiniCarrinho';
import Form from './Form';
import sizer from '../services/sizer';
import finder from '../services/finder';
import Categorias from './Categorias';

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
    if (listaDeProdutos && listaDeProdutos.length > 0) {
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
    const item = this.state.respostaDaApi.find((produto) => produto.id === event.target.name);
    const oldCart = JSON.parse(localStorage.getItem('produtos'));
    let cart;
    if (!oldCart) {
      cart = this.state.selecteds;
    } else {
      cart = oldCart;
    }
    const listId = finder(cart, item);
    if (listId === -1) {
      item.quantity = 1;
      cart.push(item);
    } else {
      cart[listId].quantity += 1;
    }
    this.setState({ selecteds: cart });
    localStorage.setItem(
      'produtos',
      JSON.stringify(cart),
    );
  }

  add(e) {
    const arr = this.state.selecteds;
    const item = arr.find((produto) => produto.id === e.target.value);
    const listId = arr.indexOf(item);
    item.quantity += 1;
    if (item.quantity <= item.available_quantity) {
      arr.splice(listId, 1);
      arr.splice(listId, 0, item);
      this.setState({ selecteds: arr });
      localStorage.setItem(
      'produtos',
      JSON.stringify(this.state.selecteds),
    );
    }
  }

  subtract(e) {
    const arr = this.state.selecteds;
    const item = arr.find((produto) => produto.id === e.target.value);
    const listId = arr.indexOf(item);
    arr.splice(listId, 1);
    item.quantity -= 1;
    if (item.quantity > 0) {
      arr.splice(listId, 0, item);
    }
    if (this.state.selecteds.length > 0) {
      this.setState({ selecteds: arr });
      localStorage.setItem('produtos', JSON.stringify(arr));
    } else {
      localStorage.clear();
      this.setState({ selecteds: [] });
    }
  }

  render() {
    const { selecteds, respostaDaApi } = this.state;
    const total = (sizer(selecteds));
    return (
      <div className="d-flex">
        <Form QC={total} OT={this.Text} OC={this.Cat} OS={this.handleClick} />
        <div>
          {respostaDaApi.map((produto) => (
            <Categorias produto={produto} func={this.handleCart} totalC={total} key={produto.id} />
          ))}
        </div>
        <div>
          {selecteds.map((cada) => (
            <MiniCarrinho key={cada.id} lista={cada} plus={this.add} minus={this.subtract} />
          ))}
        </div>
      </div>
    );
  }
}

export default Busca;
