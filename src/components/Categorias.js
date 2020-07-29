import React from 'react';
import { Link } from 'react-router-dom';

function handleDetails(produto, total) {
  localStorage.setItem('detail', JSON.stringify(produto));
  localStorage.setItem('totalProducts', JSON.stringify(total));
}

class Categorias extends React.Component {
  render() {
    const { produto, func, totalC } = this.props;
    return (
      <div key={produto.id} data-testid="product">
        <img src={produto.thumbnail} alt={produto.title} />
        <h4>{produto.title}</h4>
        {produto.shipping.free_shipping && <p data-testid="free-shipping">Frete grátis</p>}
        <p>R${produto.price.toFixed(2)}</p>
        <input
          type="button"
          value="Adicionar"
          name={produto.id}
          onClick={func}
          data-testid="product-add-to-cart"
        />
        <Link
          data-testid="product-detail-link"
          to="/product-detail"
          onClick={() => handleDetails(produto, totalC)}
        >
          VER DETALHES
        </Link>
      </div>
    );
  }
}

export default Categorias;
