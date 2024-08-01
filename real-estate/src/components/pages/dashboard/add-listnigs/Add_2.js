import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_2() {
  const navigate = useNavigate();

  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Rajkot");
  const [state, setState] = useState("Gujarat");
  const [street, setStreet] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [postalCode, setPostalCode] = useState("360001");

  const goToPreviousPage = () => {
    navigate("/add-Property-1");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "street":
        setStreet(value);
        break;
      case "roomNumber":
        setRoomNumber(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      default:
        break;
    }
  };

  const goToNextPage = () => {
    if (!country || !city || !state || !street || !postalCode) {
      toast.error("All fields must be filled");
    } else {
      const storedPropertyDetails = localStorage.getItem("propertyDetails");
      let updatedPropertyDetails = storedPropertyDetails ? JSON.parse(storedPropertyDetails) : {};
      updatedPropertyDetails = {
        ...updatedPropertyDetails,
        country,
        city,
        state,
        street,
        roomNumber,
        postalCode,
      };

      localStorage.setItem("propertyDetails", JSON.stringify(updatedPropertyDetails));
      navigate("/add-Property-3");
    }
  };

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem("propertyDetails");
    if (storedPropertyDetails) {
      const parsedPropertyDetails = JSON.parse(storedPropertyDetails);
      setCountry(parsedPropertyDetails.country || "India");
      setCity(parsedPropertyDetails.city || "Rajkot");
      setState(parsedPropertyDetails.state || "Gujarat");
      setStreet(parsedPropertyDetails.street || "");
      setPostalCode(parsedPropertyDetails.postalCode || "360001");
      setRoomNumber(parsedPropertyDetails.roomNumber || "");
    }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            02 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Your place location</div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <label className="add-label-1">Country/Region</label>
            <input
              type="text"
              className="add-input"
              id="country"
              name="country"
              placeholder="India"
              value={country}
              onChange={handleChange}
            />
            <label className="add-label-1">Street</label>
            <input
              type="text"
              className="add-input"
              id="street"
              name="street"
              value={street}
              onChange={handleChange}
            />
            <label className="add-label-1">Room number (optional)</label>
            <input
              type="text"
              className="add-input"
              id="roomNumber"
              name="roomNumber"
              value={roomNumber}
              onChange={handleChange}
            />

            <div className="add-address-1">
              <div className="add-address-1-box">
                <label className="add-label-1">City</label>
                <input
                  type="text"
                  className="add-input add-short-input"
                  id="city"
                  name="city"
                  placeholder="Rajkot"
                  value={city}
                  onChange={handleChange}
                />
              </div>
              <div className="add-address-1-box">
                <label className="add-label-1">State</label>
                <input
                  type="text"
                  className="add-input add-short-input"
                  id="state"
                  name="state"
                  placeholder="Gujarat"
                  value={state}
                  onChange={handleChange}
                />
              </div>
              <div className="add-address-1-box">
                <label className="add-label-1">Postal Code</label>
                <input
                  type="text"
                  className="add-input add-short-input"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="add-btn-box">
          <div className="add-btn-2" onClick={goToNextPage}>
            Continue
          </div>
          <div className="add-btn-1" onClick={goToPreviousPage}>
            Go back
          </div>
        </div>
      </div>
    </>
  );
}

export default Add_2;
