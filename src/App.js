import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { updateCart } from './actions/cart-actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.onUpdateCart = this.onUpdateCart.bind(this);
  }

  onUpdateCart(p, qty) {
    let product = { ...p, qty }
    this.props.onUpdateCart(product);
  }

  handleSelectChange(p, event) {
    p.qty = event.target.value;
  }

  render() {
    let products = this.props.products.map((p) =>
      <li key={p.id}>
        [{p.id}] {p.name}: ${p.price}
        <select onChange={this.handleSelectChange.bind(this, p)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button onClick={this.onUpdateCart(p, p.qty ? p.qty : 1)}>Buy</button>
      </li>
    );

    return (
      <div className="App">
        <header className="App-header">
          <ul>{products}</ul>
          <div>Cart Total: {this.props.cart.length}</div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart
});

const mapActionsToProps = {
  onUpdateCart: updateCart
};

export default connect(mapStateToProps, mapActionsToProps)(App);
