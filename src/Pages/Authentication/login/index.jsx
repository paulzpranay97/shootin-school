import { useLogin } from "../../../APIContext/LoginContext";
import NavbarCustom from "../../../Components/NavbarCustom";
import "./style.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username_or_email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login({ username_or_email, password });
        console.log("result",result)

        if (result.success) {
            navigate("/"); 
        }
    };

    return (
        <>
            <NavbarCustom />

            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="card-box">
                        <h2 className="auth-title">LOGIN</h2>

                        <form className="auth-form" style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
                            <label>Username or Email Address *</label>
                            <input
                                type="text"
                                value={username_or_email}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            <label style={{ marginTop: "1rem" }}>Password *</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className="auth-row">
                                <div className="auth-remember">
                                    <input type="checkbox" />
                                    <span style={{ display: "ruby", fontWeight: "700" }}>Remember Me</span>
                                </div>
                                <Link to="/forgot-password"  className="auth-forgot" style={{ textDecoration: "none" }}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <button className="auth-login-btn" type="submit">
                                LOGIN
                            </button>
                        </form>

                        <hr className="auth-divider" />

                        <p className="auth-note">Don’t Have An Account? Create A New Account Here</p>
                        <button className="auth-create-btn" onClick={()=>navigate("/create-an-account")}>Create Your New Account</button>
                    </div>
                </div>

                <div className="auth-side-image"></div>
            </div>
        </>
    );
}
