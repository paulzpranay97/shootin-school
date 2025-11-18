import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCustom from "../../../Components/NavbarCustom";
import Swal from "sweetalert2";
import { ParentContext } from "../../../APIContext/ParentContext";

const Register = () => {
  const { addParent } = useContext(ParentContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",          
    email: "",
    password: "",
    confirmPassword: "",
    is_self_pay: "true",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!formData.first_name.trim()) err.first_name = "First name is required";
    if (!formData.last_name.trim()) err.last_name = "Last name is required";
    if (!formData.username.trim()) err.username = "Username is required";
    if (!formData.email.trim()) err.email = "Email is required";
    if (!formData.password.trim()) err.password = "Password is required";

    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    return err;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill all required fields correctly.",
      });
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;

      const result = await addParent(payload);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Your account has been created successfully.",
        });

        setFormData({
          first_name: "",
          last_name: "",
          username: "", // reset
          email: "",
          password: "",
          confirmPassword: "",
          is_self_pay: "true",
        });

        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while creating account.",
      });
    }
  };

  return (
    <>
      <NavbarCustom />

      <div className="auth-wrapper">
        <div className="auth-side-image"></div>

        <div className="auth-card">
          <div className="card-box">
            <h2 className="auth-title">REGISTER</h2>

            <form className="auth-form" style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
              
              {/* NAME ROW */}
              <div className="name-row">
                <div className="name-field">
                  <label style={{ marginBottom: "10px" }}>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={errors.first_name ? "input-error" : ""}
                  />
                </div>

                <div className="name-field">
                  <label style={{ marginBottom: "10px" }}>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={errors.last_name ? "input-error" : ""}
                  />
                </div>
              </div>

              {/* ⭐ USERNAME FIELD */}
              <label style={{ marginTop: "1rem" }}>Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />

              {/* EMAIL */}
              <label style={{ marginTop: "1rem" }}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />

              {/* PASSWORD */}
              <label style={{ marginTop: "1rem" }}>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />

              {/* CONFIRM PASSWORD */}
              <label style={{ marginTop: "1rem" }}>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />

              {/* SUBMIT BUTTON */}
              <button className="auth-login-btn" style={{ marginTop: "1rem" }}>
                REGISTER
              </button>
            </form>

            <hr className="auth-divider" />

            <p className="auth-note">Already Have An Account?</p>

            <button
              className="auth-create-btn"
              onClick={() => navigate("/login")}
            >
              LOGIN HERE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
