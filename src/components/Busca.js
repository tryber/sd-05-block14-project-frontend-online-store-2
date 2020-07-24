import React from 'react';
import * as apiFunction from '../services/api';

class Busca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    apiFunction.getCategories().then((response) => {
      this.setState({
        options: response,
      });
    });
  }

  filter(option, texto) {
    apiFunction.getProductsFromCategoryAndQuery(option, texto);
  }

  render() {
    const { options } = this.state;
    console.log(options);
    return (
      <div>
        <form>
          <h1>Digite algum termo de pesquisa ou escolha uma categoria.</h1>
          <input type="text" />
          <select>
            {options.map((categoria) => (
              <option key={categoria.id}>{categoria.name}</option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

export default Busca;
