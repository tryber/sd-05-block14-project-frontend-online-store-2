import React from 'react';
import * as apiFunction from '../services/api';

class Busca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ id: 1, name: 'Todos' }],
      searchText: '',
      searchCategoryName: '',
      searchCategoryId: '',
      produtosPorCategoria: [],
    };
    this.capturingText = this.capturingText.bind(this);
    this.capturingCategory = this.capturingCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    apiFunction.getCategories().then((response) => { 
      this.setState({
        options: [{ id: 1, name: 'Selecione uma categoria' }, ...response],
      });
    });
  }

  capturingText(event) {
    this.setState({ searchText: event.target.value });
  }

  capturingCategory(event) {
    const id = this.state.options.find((categoria) => categoria.name === event.target.value).id;
    this.setState({
      searchCategoryName: event.target.value,
      searchCategoryId: id,
    });

    if (event.target.value === 'Selecione uma categoria') {
      this.setState({ produtosPorCategoria: [] });
    }
  }

  handleClick(event) {
    apiFunction
      .getProductsFromCategoryAndQuery(
        this.state.searchCategoryId,
        this.state.searchText,
      )
      .then((resolve) => {
        console.log(resolve.results);
        this.setState({ produtosPorCategoria: resolve.results });
      });
    event.preventDefault();
  }

  render() {
    const { options, produtosPorCategoria } = this.state;
    return (
      <div>
        <form>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <input type="text" name="searchText" onChange={this.capturingText} />
          <select name="searchCategory" onChange={this.capturingCategory}>
            {options.map((categoria) => (
              <option key={categoria.id} data-testid="category">
                {categoria.name}
              </option>
            ))}
          </select>
          <input onClick={this.handleClick} type="button" value="Buscar" />
          {produtosPorCategoria.map((produto) => (
            <div key={produto.id}>
              <img src={produto.thumbnail} alt={produto.title} />
              <h4>{produto.title}</h4>
              <p>R${produto.price.toFixed(2)}</p>
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default Busca;
