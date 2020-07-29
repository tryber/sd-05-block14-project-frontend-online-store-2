import React from 'react';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from '../../node_modules/react-icons/gi';
import MiniCarrinho from './MiniCarrinho';

class Carrinho extends React.Component {
  constructor(props) {
    super(props);
    this.state = { produto: [] };
    this.starter2 = this.starter2.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  componentDidMount() {
    this.starter2();
  }

  starter2() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('produtos'));
    this.setState({ produto: listaDeProdutos });
  }

  add(e) {
    const arr = this.state.produto;
    const item = arr.find((produto) => produto.id === e.target.value);
    const listId = arr.indexOf(item);
    arr.splice(listId, 1);
    item.quantity += 1;
    arr.splice(listId, 0, item);
    this.setState({ produtosSelecionados: arr });
    localStorage.setItem('produtos', JSON.stringify(this.state.produto));
  }

  subtract(e) {
    const arr = this.state.produto;
    const item = arr.find((produto) => produto.id === e.target.value);
    const listId = arr.indexOf(item);
    arr.splice(listId, 1);
    if (item.quantity - 1 > 0) {
      item.quantity -= 1;
      arr.splice(listId, 0, item);
    }
    this.setState({ produtosSelecionados: arr });
    localStorage.setItem('produtos', JSON.stringify(this.state.produtos));
  }

  render() {
    const { produto } = this.state;
    if (!produto) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }

    return (
      <div>
        <GiShoppingCart />
        <span data-testid="shopping-cart-size">{produto.length}</span>
        <div>
          <ul>
            {produto.map((each) => (
              <MiniCarrinho
                key={each.id}
                lista={each}
                plus={this.add}
                minus={this.subtract}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Carrinho;
