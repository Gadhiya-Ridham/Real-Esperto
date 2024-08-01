import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Login/loginPage.css";
import axios from "axios";
import * as icons from "react-icons/io5";

function LoginPage() {
  const [isOption, setOption] = useState("login");
  const [showPassword1, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    Fname: "",
    lastName: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
  };

  useEffect(() => {
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  }, [isOption]);

  const { email, username, password, confirmPassword, firstName, lastName } =
    formData;

  const toggleOption = (option) => {
    setOption(option);
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

    console.log(handleSuccess);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const usernameRegex = /\w+_+\w+/;
    const confirmPasswordMatchPassword = password === confirmPassword;

    if (isOption === "login") {
      if (!email || !password) {
        handleError("email and password cannot be empty");
        return false;
      } else return true;
    } else if (isOption === "signin") {
      if (!email || !username || !password || !firstName || !lastName) {
        handleError("All fields are required");
        return false;
      }
      if (!usernameRegex.test(username)) {
        handleError("Username must contain an underscore");
        return false;
      }
      if (!emailRegex.test(email)) {
        handleError("Invalid email format");
        return false;
      }

      if (!confirmPasswordMatchPassword) {
        handleError("Password and confirm password must match");
        return false;
      }
      if (!/(?=.*[a-z])/.test(confirmPassword)) {
        handleError("Password must contain at least one lowercase letter");
        return false;
      }

      if (!/(?=.*[A-Z])/.test(confirmPassword)) {
        handleError("Password must contain at least one uppercase letter");
        return false;
      }

      if (!/(?=.*[0-9])/.test(confirmPassword)) {
        handleError("Password must contain at least one number");
        return false;
      }

      if (!/(?=.*[!@#$%^&*])/.test(confirmPassword)) {
        handleError("Password must contain at least one special character");
        return false;
      }

      if (!/(?=.{8,12})/.test(confirmPassword)) {
        handleError("Password must be between 8 to 12 characters long");
        return false;
      } else return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isOption === "login") {
      if (validateForm()) {
        try {
          const { data } = await axios.post(
            "http://localhost:4040/login",
            {
              ...formData,
            },
            { withCredentials: true }
          );
          console.log(data);
          const { success, message } = data;
          if (success) {
            toast.success("login successfully");
            
              formData.email === "admin@gmail.com"
                ? setTimeout(() => {
                    navigate("/admin/1");
                  }, 500)
                : setTimeout(() => {
                    navigate("/");
                  }, 500);
            
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
        }
        setFormData({
          ...formData,
          email: "",
          password: "",
        });
      }
    } else {
      if (validateForm()) {
        try {
          const { data } = await axios.post(
            "http://localhost:4040/signup",
            {
              ...formData,
            },
            {
              withCredentials: true,
            }
          );
          const { success, message } = data;
          if (success) {
            toast.success("login successfully");
            setTimeout(() => {
              navigate("/");
            }, 500);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
        }
        setFormData({
          ...formData,
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="container-login">
        {isOption === "login" && <div className="text-login">Login</div>}
        {isOption === "signin" && <div className="text-login">Sign Up</div>}
        
        <div className="line-login">
          <div className="line-login-1"></div>
          <div className="or-login">OR</div>
        </div>
        <div className="form-login">
          <form onSubmit={handleSubmit}>
            {isOption === "signin" && (
              <div className="name-box-login">
                <div className="fname-login">
                  <label className="label-login">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="name login-input text-upper"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="fname-login">
                  <label className="label-login">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="name login-input text-upper"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {isOption === "signin" && (
              <>
                <label className="label-login">Username</label>
                <input
                  type="username"
                  placeholder="username"
                  className="login-input username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </>
            )}

            <label className="label-login">Email</label>
            <input
              type="text"
              placeholder="example@example.com"
              className="login-input username"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
            />
            <label className="label-login">Password</label>
            {isOption === "login" && (
              <label className="label-login special">Forgot password?</label>
            )}
            <div className="seePassword" onClick={togglePasswordVisibility}>
              {showPassword1 ? (
                <icons.IoEyeOutline />
              ) : (
                <icons.IoEyeOffOutline />
              )}
            </div>
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Enter Password"
              className="login-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {isOption === "signin" && (
              <>
                <label className="label-login">Confirm Password</label>
                <div
                  className="seePassword"
                  onClick={togglePasswordVisibility2}
                >
                  {showPassword2 ? (
                    <icons.IoEyeOutline />
                  ) : (
                    <icons.IoEyeOffOutline />
                  )}
                </div>
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Enter Password"
                  className="login-input"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </>
            )}
            <button className="btn-login" id="continue" onClick={handleSubmit}>
              Continue
            </button>
          </form>
        </div>

        <div className="newUser-login">
          {isOption === "login" && (
            <>
              New user?
              <span
                className="link-login"
                onClick={() => toggleOption("signin")}
              >
                Create an account
              </span>
            </>
          )}
          {isOption === "signin" && (
            <>
              Already have an account?
              <span
                className="link-login"
                onClick={() => toggleOption("login")}
              >
                Sign in
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
