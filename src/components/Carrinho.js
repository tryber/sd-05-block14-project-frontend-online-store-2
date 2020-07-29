import React from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from '../../node_modules/react-icons/gi';
import { Link } from 'react-router-dom';

class Carrinho extends React.Component {
  constructor(props) {
    super(props);
    this.state = { produto: [] };
    this.starter2 = this.starter2.bind(this);
  }

  componentDidMount() {
    this.starter2();
  }

  starter2() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('produtos'));
    this.setState({ produto: listaDeProdutos });
  }

  render() {
    const { produto } = this.state;
    if (!produto) {
      return (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }
    return (
      <div>
        <GiShoppingCart />
        <span data-testid="shopping-cart-size">{produto.length}</span>
        <div>
          <ul>
            {produto.map((each) => (
              <li key={each.thumbnail}>
                <p data-testid="shopping-cart-product-name">{each.title}</p>
                <img src={each.thumbnail} alt={each.title} />
                <p>{each.price}</p>
                <p data-testid="shopping-cart-product-quantity">1</p>
                <p>{each.available_quantity}</p>
              </li>
            ))}
          </ul>
          <Link data-testid="product-detail-link" to="/product-detail">VER DETALHES</Link>
        </div>
      </div>
    );
  }
}

export default Carrinho;
