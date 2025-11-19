import NavbarCustom from "../../../Components/NavbarCustom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParent } from "../../../APIContext/ParentContext";
import "./style.css";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { resetPassword } = useParent(); // <-- your API function

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const data = {
            new_password: password,
        };

        const result = await resetPassword(data);

        if (result.success) {
            navigate("/login");
        }
    };

    return (
        <>
            <NavbarCustom />

            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="card-box">
                        <h2 className="auth-title">RESET PASSWORD</h2>

                        <form className="auth-form" style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>

                            <label>New Password *</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <label style={{ marginTop: "1rem" }}>Confirm Password *</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <button className="auth-login-btn" type="submit">
                                UPDATE PASSWORD
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
