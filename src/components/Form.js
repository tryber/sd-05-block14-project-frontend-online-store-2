import React from 'react';
import * as apiFunction from '../services/api';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from '../../node_modules/react-icons/gi';
import { Link } from 'react-router-dom';
import MiniCarrinho from './MiniCarrinho';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeCategorias: [],
    };
  }

  componentDidMount() {
    apiFunction.getCategories().then((response) => {
      this.setState({
        listaDeCategorias: [
          { id: 1, name: 'Selecione uma categoria' },
          ...response,
        ],
      });
    });
  }

  render() {
    const { listaDeCategorias } = this.state;
    return (
      <div>
        <form>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          {/*OT = OnText   OC= OnCategory  OS=OnSearch*/}
          <input type="text" name="searchText" onChange={this.props.OT} />
          <input onClick={this.props.OS} type="button" value="Buscar" />
          <Link to="/shopping-cart">
            <GiShoppingCart size={44} data-testid="shopping-cart-button" />
          </Link>
        </form>
        <ul className="lista-categorias" name="searchCategory" onClick={this.props.OC}>
        {listaDeCategorias.map((categoria) => (
          <li className="lista-style" key={categoria.id} data-testid="category" id={categoria.id}>
            {categoria.name}
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default Form;
