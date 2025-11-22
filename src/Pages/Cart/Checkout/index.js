// import TrashIcon from "../../../Assets/Icons/TrashIcon";
// import './checkout.css';

import CartCom from "../../../Components/CartCom";
import { InstructionsContextProvider } from "../../../APIContext/InstructionsContext";
import CheckoutCom from '../../../Components/CheckoutCom';

const Checkout = () => {
    return (
        <InstructionsContextProvider>
            <CheckoutCom />
        </InstructionsContextProvider>
    );
};

export default Checkout;