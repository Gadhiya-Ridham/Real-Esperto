import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { defaultProfileImage } from "./defaultProfileImage";
import { AiOutlineClose } from "react-icons/ai";

function Db_tab_1() {
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    gender: "",
    username: "",
    email: "",
    DOB: "",
    address: "",
    phoneNumber: "",
    about: "",
    profileImage: "",
  });

  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const userData = {
      Fname: sessionStorage.getItem("Fname") || "",
      Lname: sessionStorage.getItem("Lname") || "",
      gender: sessionStorage.getItem("gender") || "",
      username: sessionStorage.getItem("username") || "",
      email: sessionStorage.getItem("email") || "",
      DOB: sessionStorage.getItem("DOB") || "",
      address: sessionStorage.getItem("address") || "",
      phoneNumber: sessionStorage.getItem("phoneNumber") || "",
      about: sessionStorage.getItem("about") || "",
      profileImage: sessionStorage.getItem("profileImage") || defaultProfileImage,
    };
    setFormData(userData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteButtonClick = () => {
    setFormData({ ...formData, profileImage: defaultProfileImage });
  };

  const handleProfileUpload = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        try {
          sessionStorage.setItem("profileImage", base64String);
          setFormData({ ...formData, profileImage: base64String });
          document.getElementById("displayProfilePic").src = `data:image/png;base64,${base64String}`;
        } catch (e) {
          console.error("Error storing profile image:", e);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleUpdateInfo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4040/update",
        formData
      );
      if (response.data.success) {
        Object.entries(formData).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
          window.dispatchEvent(new Event("profileImageUpdated"));
        });
        toast.success("Update Successful");
      } else {
        toast.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Failed to update user information. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="db-box-1">
        <div className="db-text-1">Account Information</div>
        <div className="db-line-1"></div>
        <div className="db-boxes-1-1">
          <div className="db-box-left-1">
            <div
              className="db-textleft-image-close"
              onClick={handleDeleteButtonClick}
            >
              <AiOutlineClose className="icon-db-close" />
            </div>
            <div className="db-image">
              <img
                src={`data:image/png;base64,${formData.profileImage}`}
                alt="Profile"
                id="displayProfilePic"
                className="db-profile-image"
              />
            </div>
            <div className="db-textleft-image" onClick={handleFileButtonClick}>
              Change Image
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleProfileUpload}
            />
          </div>
          <div className="db-box-right-1">
            <div className="db-box-name">
              <div className="db-name">
                <label className="db-label">First Name</label>
                <input
                  type="text"
                  className="db-input db-input-name text-upper"
                  name="Fname"
                  placeholder="First name"
                  onChange={handleChange}
                  value={formData.Fname}
                />
              </div>
              <div className="db-name">
                <label className="db-label">Last Name</label>
                <input
                  type="text"
                  className="db-input db-input-name text-upper"
                  name="Lname"
                  placeholder="Last name"
                  onChange={handleChange}
                  value={formData.Lname}
                />
              </div>
            </div>
            <label className="db-label">Gender</label>
            <select
              className="db-input db-gender"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="db-label">Username</label>
            <input
              type="text"
              className="db-input username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
            />
            <label className="db-label">Email</label>
            <input
              type="text"
              className="db-input"
              name="email"
              placeholder="Email"
              value={formData.email}
              disabled
            />
            <label className="db-label">Date of Birth</label>
            <input
              type="date"
              className="db-input"
              name="DOB"
              onChange={handleChange}
              value={formData.DOB ? formData.DOB.slice(0, 10) : ""}
            />
            <label className="db-label">Address</label>
            <input
              type="text"
              className="db-input"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={formData.address}
            />
            <label className="db-label">Phone Number</label>
            <input
              type="text"
              className="db-input"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
            <label className="db-label">About</label>
            <textarea
              className="db-input db-input-textarea"
              name="about"
              rows={5}
              placeholder="..."
              onChange={handleChange}
              value={formData.about}
            ></textarea>
            <div className="db-btn" onClick={handleUpdateInfo}>
              Update Info
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Db_tab_1;
