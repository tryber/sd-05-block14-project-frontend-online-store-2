import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

let counter = 0
class MiniCarrinho extends React.Component {
  render() {
    return (
      <div>
        <GiShoppingCart />
        <div>
          <ul key={counter+1}>
            {this.props.lista.map((produto) => (
              <li key={counter+1}>
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
