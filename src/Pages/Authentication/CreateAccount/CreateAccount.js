import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ParentContext } from "../../../APIContext/ParentContext";
import NavbarCustom from "../../../Components/NavbarCustom";
import LoginImg from "../../../Assets/Images/login-img.png";
import Swal from "sweetalert2";
import "./createaccount.css";

const CreateAccount = () => {
  const { addParent } = useContext(ParentContext);
  const toastRef = React.useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    is_self_pay: "true",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.first_name.trim()) err.first_name = "First name is required";
    if (!formData.last_name.trim()) err.last_name = "Last name is required";
    if (!formData.email.trim()) err.email = "Email is required";
    if (!formData.username.trim()) err.username = "Username is required";
    if (!formData.phone.trim()) err.phone = "Phone is required";
    if (!formData.address.trim()) err.address = "Address is required";
    if (!formData.password) err.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          confirmPassword: "",
          is_self_pay: "true",
        });
  
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
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
      <Toast ref={toastRef} />
      <div className="create-account-ui">
        <div className="ca-container">
          <div className="ca-form">
            <h1>Create Your Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="ca-form-group">
                <div className="ca-form-group-item">
                  <InputText
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={errors.first_name ? "p-invalid" : ""}
                  />
                </div>
                <div className="ca-form-group-item">
                  <InputText
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={errors.last_name ? "p-invalid" : ""}
                  />
                </div>
              </div>
              <div className="ca-form-group">
                <InputText
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "p-invalid" : ""}
                />
              </div>
              <div className="ca-form-group">
                <InputText
                  placeholder="Your Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "p-invalid" : ""}
                />
              </div>

              <div className="ca-form-group">
                <InputText
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "p-invalid" : ""}
                />
              </div>
              <div className="ca-form-group">
                <InputText
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "p-invalid" : ""}
                />
              </div>
              <div className="ca-radio-group">
                <div className="radio-group-item">
                  <RadioButton
                    inputId="selfPay"
                    name="is_self_pay"
                    value="true"
                    onChange={handleChange}
                    checked={formData.is_self_pay === "true"}
                  />
                  <label htmlFor="selfPay">Self Pay</label>
                </div>
                <div className="radio-group-item">
                  <RadioButton
                    inputId="selfDirection"
                    name="is_self_pay"
                    value="false"
                    onChange={handleChange}
                    checked={formData.is_self_pay === "false"}
                  />
                  <label htmlFor="selfDirection">Self Direction</label>
                </div>
              </div>
              <div className="ca-form-group">
                <p className="red-info">
                  If you have self direction, we need your card on file only for
                  no-shows or cancellations.
                </p>
              </div>
              <div className="ca-form-group">
                <Password
                  toggleMask
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "p-invalid" : ""}
                  feedback={false} 
                />
              </div>
              <div className="ca-form-group">
                <Password
                  toggleMask
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "p-invalid" : ""}
                  feedback={false}
                />
              </div>
              <div className="ca-form-group">
                <button type="submit">Create Your Account</button>
              </div>
              <hr />
              <div className="ca-form-group login-link">
                <p>Already have an account? Login</p>
                <Link to="/login">Log in to Your Account</Link>
              </div>
            </form>
          </div>
          <div className="ca-image">
            <img src={LoginImg} alt="login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
