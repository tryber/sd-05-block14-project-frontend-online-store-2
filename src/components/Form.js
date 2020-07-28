import React from 'react';
import { Link } from 'react-router-dom';
import * as apiFunction from '../services/api';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from '../../node_modules/react-icons/gi';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listaDeCategorias: [] };
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
          {/* OT = OnText OC= OnCategory  OS=OnSearch */}
          <input type="text" name="searchText" onChange={this.props.OT} data-testid="query-input" />
          <input onClick={this.props.OS} type="button" value="Buscar" data-testeid="query-button" />
          <Link to="/shopping-cart">
            <GiShoppingCart size={44} data-testid="shopping-cart-button" />
          </Link>
        </form>
        <div className="col-8 text-start">
          {listaDeCategorias.map((cat) => (
            <div>
              <button data-testid="category" id={cat.id} onClick={this.props.OC}>{cat.name}</button>
              <br />
            </div>
        ))}
        </div>
      </div>
    );
  }
}

export default Form;
