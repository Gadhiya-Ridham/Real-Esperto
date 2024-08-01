import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_1() {
  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [rentalForm, setRentalForm] = useState("Entire place");

  const email = sessionStorage.getItem("email");
  const hostName = localStorage.getItem("hostName");
  const hostDate = sessionStorage.getItem("hostJoinTime")?.slice(0, 10) || "";
  const year = hostDate.slice(0, 4);
  const monthnumber = hostDate.slice(5, 7);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[parseInt(monthnumber, 10) - 1] || "Unknown";
  const hostJoinDate = `${month} ${year}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "propertyType":
        setPropertyType(value);
        break;
      case "propertyName":
        setPropertyName(value);
        break;
      case "rentalForm":
        setRentalForm(value);
        break;
      default:
        break;
    }
  };

  const goToNextPage = () => {
    if (!propertyType || !propertyName || !rentalForm) {
      toast.error("All fields are required");
      return;
    }

    const storedPropertyDetails = localStorage.getItem("propertyDetails");
    let updatedPropertyDetails = storedPropertyDetails ? JSON.parse(storedPropertyDetails) : {};

    updatedPropertyDetails = {
      ...updatedPropertyDetails,
      propertyType,
      propertyName,
      rentalForm,
      email,
      hostName,
      hostJoinDate,
    };

    localStorage.setItem("propertyDetails", JSON.stringify(updatedPropertyDetails));
    navigate("/add-Property-2");
  };

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem("propertyDetails");
    if (storedPropertyDetails) {
      const parsedPropertyDetails = JSON.parse(storedPropertyDetails);
      setPropertyType(parsedPropertyDetails.propertyType || "");
      setPropertyName(parsedPropertyDetails.propertyName || "");
      setRentalForm(parsedPropertyDetails.rentalForm || "Entire place");
    }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            01 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Choosing listing categories</div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <label className="add-label-1">Choose a property type</label>
            <select
              className="add-input add-choose"
              id="propertyType"
              name="propertyType"
              value={propertyType}
              onChange={handleChange}
            >
              <option value="">Choose Property</option>
              <option value="Hotel">Hotel</option>
              <option value="Mansion">Mansion</option>
              <option value="Land">Land</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Office">Office</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
              <option value="Apartment">Apartment</option>
            </select>
            <label className="add-label-1">Property Name</label>
            <input
              type="text"
              className="add-input"
              id="propertyName"
              name="propertyName"
              placeholder="Property Name"
              value={propertyName}
              onChange={handleChange}
            />
            <label className="add-label-1">Rental form</label>
            <select
              className="add-input add-rental"
              id="rentalForm"
              name="rentalForm"
              value={rentalForm}
              onChange={handleChange}
            >
              <option value="Entire place">Entire place</option>
              <option value="Private room">Private room</option>
            </select>
          </div>
        </div>
        <div className="add-btn-box">
          <div className="add-btn-2" onClick={goToNextPage}>
            Continue
          </div>
        </div>
      </div>
    </>
  );
}

export default Add_1;
