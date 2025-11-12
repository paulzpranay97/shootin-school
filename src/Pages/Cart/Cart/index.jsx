import TrashIcon from "../../../Assets/Icons/TrashIcon";
import './cart.css'

const Cart = () => {
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
                        <tr className="border-1">
                            <td className="pdt-name-first">Group Instruction</td>
                            <td>
                                <div className="product-desc-table">
                                    <table border={0}>
                                        <tr>
                                            <td>Group Instruction Sessions</td>
                                            <td>1 Session</td>
                                        </tr>
                                        <tr>
                                            <td>Selected option</td>
                                            <td>Create a Child</td>
                                        </tr>
                                        <tr>
                                            <td>Selected Child Name</td>
                                            <td>j j</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Birth</td>
                                            <td>2017-04-11</td>
                                        </tr>
                                        <tr>
                                            <td>Grade</td>
                                            <td>3rd</td>
                                        </tr>
                                        <tr>
                                            <td>Jersey size</td>
                                            <td>Youth Medium</td>
                                        </tr>
                                        <tr>
                                            <td>School Name</td>
                                            <td>j</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                            <td className="weight-800">$55.00</td>
                            <td>
                                <span className="delete-item">
                                    <TrashIcon />
                                </span>
                            </td>
                        </tr>
                        <tr className="cart-total-row">
                            <td className="cart-total-cstm">Cart Total</td>
                            <td></td>
                            <td>$55.00</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="proceed-checkout-btn btn">
                <button>Proceed to Checkout</button>
            </div>
        </div>
    );
};
export default Cart;