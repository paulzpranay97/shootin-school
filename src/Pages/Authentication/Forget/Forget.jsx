import NavbarCustom from "../../../Components/NavbarCustom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParent } from "../../../APIContext/ParentContext";
import "./style.css";
export default function Forget() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { forgotPassword } = useParent();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = await forgotPassword({ email });
        
        if (result.success) {
            localStorage.setItem("resetEmail", email);
            navigate("/otp-verify"); 
        }
    };

    return (
        <>
            <NavbarCustom />

            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="card-box">
                        <h2 className="auth-title">FORGOT PASSWORD</h2>

                        <form className="auth-form" style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
                            <label>Email Address *</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <button className="auth-login-btn" type="submit">
                                SEND OTP
                            </button>
                        </form>

                        <hr className="auth-divider" />

                        <button
                            className="auth-create-btn"
                            onClick={() => navigate("/login")}
                        >
                            Back To Login
                        </button>
                    </div>
                </div>
             <div className="auth-side-image"></div>
            </div>
        </>
    );
}
