import React, { useEffect } from 'react';
import './cartcom.css';
import { useInstructions } from '../../APIContext/InstructionsContext';
import TrashIcon from "../../Assets/Icons/TrashIcon";
import { useNavigate } from 'react-router-dom';

function CartCom() {
    const { fetchCartItems, cartItems, removeFromCart } = useInstructions(); 
    const navigate = useNavigate()
    useEffect(() => {
        fetchCartItems();
    }, []);

    const cartTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);


    return (
        <div className="cart-page">
            <div className="cart-table">
                <table className="font-antonio">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Product Description</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="border-1">
                                <td className="pdt-name-first">
                                    {item.package_name || 'Session Package'}
                                </td>
                                <td>
                                    <div className="product-desc-table">
                                        <table border={0}>
                                            <tbody>
                                                <tr>
                                                    <td>Session Type</td>
                                                    <td>{item.package_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Player Name</td>
                                                    <td>{item.player_name}</td>
                                                </tr>
                                                {/* {item.parent_name && (
                                                    <tr>
                                                        <td>Parent Name</td>
                                                        <td>{item.parent_name}</td>
                                                    </tr>
                                                )} */}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                                <td className="weight-800">${item.total_price}</td>
                                <td>
                                    <span
                                        className="delete-item"
                                        onClick={() => removeFromCart?.(item.id)} // optional chaining if function exists
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TrashIcon />
                                    </span>
                                </td>
                            </tr>
                        ))}
                        <tr className="cart-total-row">
                            <td className="cart-total-cstm">Cart Total</td>
                            <td></td>
                            <td className="weight-800">${cartTotal}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {cartItems.length > 0 && <div className="proceed-checkout-btn btn">
                <button onClick={()=> navigate("/checkout")} >Proceed to Checkout</button>
            </div>}
        </div>
    );
}

export default CartCom;
