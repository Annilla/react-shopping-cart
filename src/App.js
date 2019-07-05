import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addCart } from './actions/cart-actions';
import { createSelector } from 'reselect';

class App extends Component {
  constructor(props) {
    super(props);
    // 設置此 component 的 state
    this.state = {
      // 將 store 引進來的 props 放到 state
      // 當 store 刷新的時候，才不會影響到此 component 的狀態
      productList: this.props.products.map(el => ({ ...el, qty: 1 }))
    };
  }

  /**
   * handleSelectChange 下拉數量改變時觸發之函數
   * @param {object} p 更改數量的產品
   * @param {object} event 事件觸發
   */
  handleSelectChange(p, event) {
    // 先將數量儲存起來，因為在 this.setState 裡面 event 會變成 null
    let buyQTY = event.target.value;

    // 更新 state 中的 productList
    this.setState(state => {
      let newProductList = state.productList.map(el =>{
        if (el.id === p.id) { // 只改變有相同 ID 產品的數量
          return { ...el, qty: Number(buyQTY) };
        } else {
          return el;
        }
      });
      return { productList: newProductList };
    });
  }

  /**
   * buyItem 將購買產品放到購物車
   * @param {number} id 產品ID
   */
  buyItem(id) {
    // 找尋 productList 中指定 ID 的產品
    let item = this.state.productList.find(el => el.id === id);
    // 放到購物車，觸發 redux action
    this.props.onAddCart(item);
  }

  render() {
    // 將商品 productList 列出來
    let products = this.state.productList.map((p) =>
      <li key={p.id}>
        [{p.id}] {p.name}: ${p.price} / QTY: &nbsp;
        <select
          onChange={this.handleSelectChange.bind(this, p)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button onClick={() => { this.buyItem(p.id) }}>
          Buy
        </button>
      </li>
    );

    return (
      <div className="App">
        <header className="App-header">
          <ul>{products}</ul>
          <div>Cart Total QTY: {subtotalSelector(this.props)}</div>
        </header>
      </div>
    );
  }
}

// 使用 Reselect 做購物車中商品數量的加總，因為這些衍伸值不需存入 Redux 中
const cartItemsSelector = state => state.cart;
const subtotalSelector = createSelector(
  cartItemsSelector,
  items => items.reduce((acc, item) => acc + item.qty, 0)
);

// 將 Redux state 當作此 component 的 props 傳進來
const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart
});

// 將 Redux action 當作此 component 的 props 傳進來
const mapActionsToProps = {
  onAddCart: addCart
};

export default connect(mapStateToProps, mapActionsToProps)(App);
