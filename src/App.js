import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addCart } from './actions/cart-actions';
import { createSelector } from 'reselect';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.products);
  }

  handleSelectChange(p, event) {
    this.props.products.forEach(el => {
      if(el.id === p.id) { el.qty = Number(event.target.value); }
    });
    console.log(this.props.products);
  }

  buyItem(id) {
    let item = this.props.products.find(el => el.id === id);
    this.props.onAddCart(item);
  }

  render() {
    let products = this.props.products.map((p) =>
      <li key={p.id}>
        [{p.id}] {p.name}: ${p.price}
        <select
          onChange={this.handleSelectChange.bind(this, p)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button onClick={() => {this.buyItem(p.id)}}>
          Buy
        </button>
      </li>
    );

    return (
      <div className="App">
        <header className="App-header">
          <ul>{products}</ul>
          <div>Cart Total: {subtotalSelector(this.props)}</div>
        </header>
      </div>
    );
  }
}

const cartItemsSelector = state => state.cart;

const subtotalSelector = createSelector(
  cartItemsSelector,
  items => items.reduce((acc, item) => acc + item.qty, 0)
)

const mapStateToProps = state => ({
  products: state.products.map(el => ({ ...el, qty: 1 })),
  cart: state.cart
});

const mapActionsToProps = {
  onAddCart: addCart
};

export default connect(mapStateToProps, mapActionsToProps)(App);
