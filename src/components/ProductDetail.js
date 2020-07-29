import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import finder from '../services/finder';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { produto: [], total: 0 };
    this.starter3 = this.starter3.bind(this);
  }

  componentDidMount() {
    this.starter3();
  }

  starter3() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('detail'));
    const QC = JSON.parse(localStorage.getItem('totalProducts'));
    this.setState({ produto: listaDeProdutos, total: QC });
  }

  addToCart(produto) {
    const item = produto;
    let cart;
    const carrinho = JSON.parse(localStorage.getItem('produtos'));
    if (carrinho) {
      cart = carrinho;
    } else {
      cart = [];
    }
    const index = finder(cart, item);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      item.quantity = 1;
      cart.push(item);
    }
    localStorage.setItem('produtos', JSON.stringify(cart));
    this.setState({ total: this.state.total + 1 });
  }

  render() {
    const { produto, total } = this.state;
    return (
      <div>
        <ul>
          <li>
            <p data-testid="product-detail-name">{produto.title}</p>
            <img src={produto.thumbnail} alt={produto.title} />
            <p>{produto.price}</p>
          </li>
        </ul>
        <Link to="/shopping-cart">
          <GiShoppingCart size={44} data-testid="shopping-cart-button" />
        </Link>
        <span data-testid="shopping-cart-size">{total}</span>
        <input
          type="button"
          value="ADICIONAR AO CARRINHO"
          onClick={() => this.addToCart(produto)}
          data-testid="product-detail-add-to-cart"
        />
      </div>
    );
  }
}

export default ProductDetail;
