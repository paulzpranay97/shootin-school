import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import CoverPhoto from "../../../Assets/Images/login-img.png";
import NavbarCustom from "../../../Components/NavbarCustom";
import { useLogin } from "../../../APIContext/LoginContext";
import Swal from "sweetalert2";

const Login = () => {
  const { login, error, loading } = useLogin();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!identifier.trim()) {
      setFormError("Please enter email or username.");
      return false;
    }

    if (!password.trim()) {
      setFormError("Please enter your password.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: formError,
      });
      return;
    }

    const payload = {
      username_or_email: identifier,
      password,
    };

    const result = await login(payload);

    if (result?.success) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error || "Invalid credentials or server error",
      });
    }
  };

  return (
    <>
      <NavbarCustom />
      <div className="login-container">
        <div className="cover-photo-banner">
          <img src={CoverPhoto} alt="Cover" className="cover-photo" />
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="identifier"
                name="identifier"
                placeholder="Email ID or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {formError && <p className="error-message">{formError}</p>}

            <div className="form-group">
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="sign-in-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {error && !formError && (
              <p className="error-message">{error}</p>
            )}
          </form>

          <hr />
          <div className="new-account">
            <p>New here? Create an Account!</p>
            <Link className="create-account-button" to="/create-an-account">
              Create Your Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
