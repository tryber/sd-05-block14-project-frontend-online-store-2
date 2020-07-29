import React from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class MiniCarrinho extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: this.props.lista.quantity };
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
    this.starter4 = this.starter4.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.quantity !== prevState.quantity) {
      this.starter4();
    }
  }

  starter4() {
    this.setState({ quantity: this.state.quantity });
  }

  add(e) {
    const limitador = this.props.lista.available_quantity;
    const adding = this.props.plus;
    adding(e);
    if (this.props.lista.quantity < limitador) {
      this.setState({ quantity: this.state.quantity + 1 });
    }
  }

  sub(e) {
    const subt = this.props.minus;
    subt(e);
  }

  render() {
    const { title, thumbnail, price, id, quantity, shipping } = this.props.lista;
    return (
      <div>
        <ul key="lista">
          <li key={thumbnail}>
            <p data-testid="shopping-cart-product-name">{title}</p>
            <img src={thumbnail} alt={title} />
            {shipping.free_shipping && (
              <p data-testid="free-shipping">Frete Grátis</p>
            )}
            <p>{price}</p>
            <div>
              <p>Quantidade:</p>
              <button data-testid="product-decrease-quantity" value={id} onClick={this.sub}>
                -
              </button>
              <span data-testid="shopping-cart-product-quantity">
                {quantity}
              </span>
              <button value={id} data-testid="product-increase-quantity" onClick={this.add}>
                +
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default MiniCarrinho;
