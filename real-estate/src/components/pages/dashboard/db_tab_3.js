import React, { useState } from "react";
import "./dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Db_tab_3() {
  const [formData, setFormData] = useState({
    email: sessionStorage.getItem("email") || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("all field are require!");
      return false;
    }
    if (newPassword === confirmPassword) {
      return true;
    } else {
      toast.error("New Password and Confirm password must match");
      return false;
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:4040/updatePassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
        } else {
          toast.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />

      <div className="db-box-3">
        <div className="db-text-1">Update your password</div>
        <div className="db-line-1"></div>
        <div className="db-box-3-1">
          <label className="db-label">Current password</label>
          <input
            type="password"
            className="db-password"
            id="currentPassword"
            name="currentPassword"
            placeholder="Current password"
            onChange={handleChange}
          />
          <label className="db-label">New password</label>
          <input
            type="password"
            className="db-password"
            id="newPassword"
            name="newPassword"
            placeholder="New password"
            onChange={handleChange}
          />
          <label className="db-label">Confirm password</label>
          <input
            type="password"
            className="db-password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
          />
          <div className="db-btn-box-3">
            <div className="db-btn-3" onClick={handleUpdateInfo}>
              Update password
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Db_tab_3;
