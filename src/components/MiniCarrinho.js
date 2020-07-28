import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class MiniCarrinho extends React.Component {
  render() {
    return (
      <div>
        <GiShoppingCart />
        <span data-testid="shopping-cart-size">{this.props.lista.length}</span>
        <div>
          <ul key="lista">
            {this.props.lista.map((produto) => (
              <li key={produto.thumbnail}>

                <p>{produto.title}</p>
                <img src={produto.thumbnail} alt={produto.title} />
                <p>{produto.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MiniCarrinho;
