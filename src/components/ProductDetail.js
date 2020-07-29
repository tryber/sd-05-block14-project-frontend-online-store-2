import React from 'react';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.props = { produto: [] };
    this.starter3 = this.starter3.bind(this);
  }

  componentDidMount() {
    this.starter3();
  }

  starter3() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('produtos'));
    this.setState({ produto: listaDeProdutos });
  }

  render() {
    const { produto } = this.state;
    return (
      <div>DETALHES
        <ul>
          {produto.map((each) => (
            <li>
              <p data-testid="product-detail-name">{each.title}</p>
              <img src={each.thumbnail} alt={each.title} />
              <p>{each.price}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductDetail;
