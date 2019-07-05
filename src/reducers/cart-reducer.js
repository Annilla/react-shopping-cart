import { ADD_CART } from '../actions/cart-actions'

export default function cartReducer(state = [], {type, payload}) {
  switch (type) {
    case ADD_CART:
      // 檢查 cart 裡面有沒有重複的產品
      let checkItem = state.filter(el => el.id === payload.id);

      if (!checkItem.length) {
        // 沒有重複就直接加入
        return [ ...state, payload ];
      } else {
        // 有重複就將數量相加
        return state.map(el => {
          if (el.id === checkItem[0].id) {
            return { ...el, qty: el.qty + payload.qty };
          } else {
            return el;
          }
        });
      }
    default:
      return state;
  }
}