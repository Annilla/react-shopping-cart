export const ADD_CART = 'cart:addProduct';

export function updateCart (productObject) {
  return {
    type: ADD_CART,
    payload: productObject
  }
}