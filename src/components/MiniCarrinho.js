import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { BsPlusSquare } from 'react-icons/bs';
import { FiMinusSquare } from 'react-icons/fi';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class MiniCarrinho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.lista.quantity,
    };
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
  }

  add(e) {
    const adding = this.props.plus;
    adding(e);
    this.setState({
      quantity: this.state.quantity + 1,
    });
  }

  sub(e) {
    const subt = this.props.minus;
    subt(e);
    this.setState({
      quantity: this.state.quantity - 1,
    });
  }

  render() {
    const produto = this.props.lista;
    if (this.state.quantity > 0) {
      return (
        <div>
          <span data-testid="shopping-cart-size">
            {this.props.lista.length}
          </span>
          <div>
            <ul key="lista">
              <li key={produto.thumbnail}>
                <p data-testid="shopping-cart-product-name">{produto.title}</p>
                <img src={produto.thumbnail} alt={produto.title} />
                <p>{produto.price}</p>
                <div>
                  <p>Quantidade:</p>
                  <button
                    data-testid="product-decrease-quantity"
                    value={produto.id}
                    onClick={this.sub}
                  >
                    -
                  </button>
                  <span data-testid="shopping-cart-product-quantity">
                    {produto.quantity}
                  </span>
                  <button
                    value={produto.id}
                    data-testid="product-increase-quantity"
                    onClick={this.add}
                  >
                    +
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default MiniCarrinho;
