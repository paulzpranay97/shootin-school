import NavbarCustom from "../../../Components/NavbarCustom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParent } from "../../../APIContext/ParentContext";
import "./style.css";

export default function OtpVerify() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { VerifyOTP } = useParent(); // <-- call verify API

    const handleChange = (value, index) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }
        const data = { 
            otp: otpCode,
            email: localStorage.getItem("resetEmail"),
         };
        const result = await VerifyOTP(data);

        if (result.success) {  
            navigate("/reset-password"); 
        }
    };

    return (
        <>
            <NavbarCustom />

            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="card-box">
                        <h2 className="auth-title">VERIFY OTP</h2>

                        <form className="auth-form" style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>

                            <label>Enter 6-digit OTP *</label>

                            <div className="otp-container">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        className="otp-input"
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        required
                                    />
                                ))}
                            </div>

                            <button className="auth-login-btn" type="submit">
                                VERIFY OTP
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
