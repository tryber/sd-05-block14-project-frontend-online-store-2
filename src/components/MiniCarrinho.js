import React from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Busca from './Busca';

class MiniCarrinho extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GiShoppingCart />
        <div>
          <ul>
            {this.props.lista.map((produto) => (
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

export default MiniCarrinho;
