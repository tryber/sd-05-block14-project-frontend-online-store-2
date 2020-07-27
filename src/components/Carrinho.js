import React from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from '../../node_modules/react-icons/gi';
import { Link } from 'react-router-dom';
import Busca from './Busca';

class Carrinho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: [],
    };
  }

  componentDidMount() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('produtos'));
    this.setState({
      produto: listaDeProdutos,
    });
  }

  render() {
    const { produto } = this.state;
    if (!produto) {
      return (
        <p data-testeid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }

    return (
      <div>
        <GiShoppingCart />
        <div>
          <ul>
            {produto.map((produto) => (
              <li>
                <p>{produto.title}</p>
                <img src={produto.thumbnail} />
                <p>{produto.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Carrinho;
