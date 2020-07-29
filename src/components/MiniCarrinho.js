import React from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class MiniCarrinho extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: this.props.lista.quantity };
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
  }

  add(e) {
    const adding = this.props.plus;
    adding(e);
    this.setState({ quantity: this.state.quantity + 1 });
  }

  sub(e) {
    const subt = this.props.minus;
    subt(e);
    this.setState({ quantity: this.state.quantity - 1 });
  }

  render() {
    const { title, thumbnail, price, id, quantity } = this.props.lista;
    if (this.state.quantity > 0) {
      return (
        <div>
          <ul key="lista">
            <li key={thumbnail}>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <img src={produto.thumbnail} alt={title} />
              <p>{price}</p>
              <div>
                <p>Quantidade:</p>
                <button data-testid="product-decrease-quantity" value={id} onClick={this.sub}>
                  -
                </button>
                <span data-testid="shopping-cart-product-quantity">{quantity}</span>
                <button value={id}data-testid="product-increase-quantity" onClick={this.add}>
                +
                </button>
              </div>
            </li>
          </ul>
        </div>
      );
    } 
    return <div />
  }
}

export default MiniCarrinho;
