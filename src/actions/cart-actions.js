export const ADD_CART = 'cart:addProduct';

export function addCart (productObject) {
  return {
    type: ADD_CART,
    payload: productObject
  }
}