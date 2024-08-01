import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_3() {
  const navigate = useNavigate();

  const [bedroom, setBedroomCount] = useState(2);
  const [baths, setBathroomCount] = useState(2);
  const [beds, setBedsCount] = useState(4);
  const [parking, setParkingAvailable] = useState(false);
  const [area, setArea] = useState("");

  const goToPreviousPage = () => {
    navigate("/add-Property-2");
  };

  const goToNextPage = () => {
    if (!area) {
      toast.error("Area must be provided");
    } else if (beds === 0 || baths === 0 || bedroom === 0) {
      toast.error("Beds, bathroom, and bedroom counts must be greater than 0");
    } else {
      const storedPropertyDetails = localStorage.getItem("propertyDetails");
      let updatedPropertyDetails = {};
      if (storedPropertyDetails) {
        updatedPropertyDetails = JSON.parse(storedPropertyDetails);
      }
      updatedPropertyDetails = {
        ...updatedPropertyDetails,
        bedroom,
        baths,
        beds,
        parking,
        area,
      };

      localStorage.setItem(
        "propertyDetails",
        JSON.stringify(updatedPropertyDetails)
      );
      navigate("/add-Property-4");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "area") {
      const areaValue = parseFloat(value);
      setArea(isNaN(areaValue) ? "" : areaValue);
    }
  };

  const handleParkingChange = (e) => {
    setParkingAvailable(e.target.checked);
  };

  const incrementCount = (setter) => {
    setter(prevCount => prevCount + 1);
  };

  const decrementCount = (setter, count) => {
    if (count > 0) {
      setter(prevCount => prevCount - 1);
    }
  };

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem("propertyDetails");
    if (storedPropertyDetails) {
      const parsedPropertyDetails = JSON.parse(storedPropertyDetails);
      setBedroomCount(parsedPropertyDetails.bedroom || 2);
      setBathroomCount(parsedPropertyDetails.baths || 2);
      setBedsCount(parsedPropertyDetails.beds || 4);
      setArea(parsedPropertyDetails.area || "");
      setParkingAvailable(parsedPropertyDetails.parking || false);
    }
  }, []);

  const renderCountSelector = (label, count, setter) => (
    <div className="add-box-3-sp">
      <h4>{label}</h4>
      <div className="add-count-box">
        <div
          className={`add-add-minus-btn-3 ${count <= 0 ? "disabled" : ""}`}
          onClick={() => decrementCount(setter, count)}
        >
          <div className="add-box-count-hover"></div>
          <span>-</span>
        </div>
        <div className="add-count-number-3">{count}</div>
        <div
          className="add-add-minus-btn-3"
          onClick={() => incrementCount(setter)}
        >
          <div className="add-box-count-hover"></div>
          <span>+</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            03 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Size of your location</div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <label className="add-label-1">Area (sq. ft.)</label>
            <input
              type="text"
              className="add-input"
              id="area"
              name="area"
              placeholder="Area"
              value={area}
              onChange={handleChange}
            />
            {renderCountSelector("Bedroom", bedroom, setBedroomCount)}
            {renderCountSelector("Beds", beds, setBedsCount)}
            {renderCountSelector("Bathroom", baths, setBathroomCount)}

            <div className="add-box-3-sp">
              <h4>Parking</h4>
              <div className="add-tick-box">
                <input
                  type="checkbox"
                  className="add-checkbox"
                  id="check"
                  checked={parking}
                  onChange={handleParkingChange}
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

export default Add_3;
