import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { produto: [], total: 0 };
    this.starter3 = this.starter3.bind(this);
  }

  componentDidMount() {
    this.starter3();
  }

  starter3() {
    const listaDeProdutos = JSON.parse(localStorage.getItem('detail'));
    const QC = JSON.parse(localStorage.getItem('totalProducts'))
    this.setState({ produto: listaDeProdutos, total: QC });
  }

  render() {
    const { produto, total } = this.state;
    return (
      <div>
        <ul> 
            <li>
              <p data-testid="product-detail-name">{produto.title}</p>
              <img src={produto.thumbnail} alt={produto.title} />
              <p>{produto.price}</p>
            </li>
        </ul>
        <Link to="/shopping-cart">
          <GiShoppingCart size={44} data-testid="shopping-cart-button" />
        </Link>
        <span data-testid="shopping-cart-size">{total}</span>
      </div>
    );
  }
}

export default ProductDetail;
