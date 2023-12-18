export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    //calculate items Price
    state.itemsPrice = addDecimals(state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0))

    //calculate shippiing price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

    //calcualte tax price
    state.taxprice = addDecimals(Number(state.itemsPrice * 0.15))

    //calculate total price

    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxprice)).toFixed(2)

    localStorage.setItem('cart', JSON.stringify(state))
    return state
}