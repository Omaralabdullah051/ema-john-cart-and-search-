import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const { cart } = props;
    console.log(cart);

    //using for loop 
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        total += product.price * product.quantity;
        shipping += product.shipping * product.quantity;
        quantity += product.quantity;
    }
    //or using array reduce methods
    // const totalReducer = (previous, current) => previous + current.price;
    // const total = cart.reduce(totalReducer, 0);
    // const shippingReducer = (previous, current) => previous + current.shipping;
    // const shipping = cart.reduce(shippingReducer, 0);


    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
            {props.children}
        </div>
    );
};

export default Cart;
