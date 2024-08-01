import React, { useState } from "react";
import "../../../property/property-tab/property-tab/right-tab/rightTab1.css";
import { FaStar } from "react-icons/fa";
import * as Icons from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Property_Details = () => {
  return JSON.parse(localStorage.getItem("propertyDetails"));
};

function RightTabPreview() {
  const navigate = useNavigate();
  const property = Property_Details();
  const [activeButton, setActiveButton] = useState("buy");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handelButtonReserve = () => {
    toast.warn("Please Publis.");
  };

  const handelBackButton = () => {
    navigate("/add-Property-8");
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      {property ? (
        <div className="property-box-right-1">
          <div className="p-box-heading-right">
            <h3>
              $<p>{property.price}</p>
            </h3>
            <FaStar className="property-icon-star" />
            <h4>{property.rating}</h4>
          </div>
          <div className="property-right-inner-box-1">
            <div className="prt-rgt-boxs-1">
              <div className="prt-rgt-box-1">
                <div className="innr-box-1">
                  <Icons.Share className="prt-rgt-icon" />
                  <h2>
                    {property.network}
                    <p>Network</p>
                  </h2>
                </div>
                <div className="innr-box-1">
                  <Icons.PeopleFill className="prt-rgt-icon" />
                  <h2>
                    {property.family}
                    <p>Family</p>
                  </h2>
                </div>
              </div>
              <div className="prt-rgt-box-2">
                <div
                  className={`btn-rgt-box-1 ${
                    activeButton === "buy" ? "act-rgt" : ""
                  }`}
                  onClick={() => handleButtonClick("buy")}
                >
                  Buy
                </div>
                <div
                  className={`btn-rgt-box-2 ${
                    activeButton === "rent" ? "act-rgt" : ""
                  }`}
                  onClick={() => handleButtonClick("rent")}
                >
                  Rent
                </div>
              </div>
            </div>
            <div className="prt-rgt-boxs-2">
              <p>
                For Buy : <span>$ {property.price}</span>
              </p>
              <p>
                For Rent : <span>$ {property.rent} / month</span>
              </p>
            </div>
          </div>
          {activeButton === "buy" && (
            <div className="property-calcultaion-buy">
              <div className="prt-calc-box-1">
                <h5>
                  Buy <p>$ {property.price}</p>
                </h5>
              </div>
              <div className="prt-calc-box-2">
                <h5>
                  Dealer Charge<span>(for Buy)</span>
                  <p>$ {property.delarChargeForBuy}</p>
                </h5>
              </div>
              <div className="prt-calc-line-2"></div>
              <div className="prt-calc-box-3">
                <h5>
                  Total
                  <p>$ {property.price + property.delarChargeForBuy}</p>
                </h5>
              </div>
            </div>
          )}
          {activeButton === "rent" && (
            <div className="property-calcultaion-rent">
              <div className="prt-calc-box-1">
                <h5>
                  Rent Per Month
                  <p>$ {property.rent}</p>
                </h5>
              </div>
              <div className="prt-calc-box-2">
                <h5>
                  Dealer Charge<span>(for Rent)</span>
                  <p>$ {property.delarChargeForRent}</p>
                </h5>
              </div>
              <div className="prt-calc-line-2"></div>
              <div className="prt-calc-box-3">
                <h5>
                  Total<span>(for 1 year)</span>
                  <p>$ {property.rent * 12 + property.delarChargeForRent}</p>
                </h5>
              </div>
            </div>
          )}
          <div className="property-booking" onClick={handelButtonReserve}>
            Reserve
          </div>
          <div className="property-booking-back" onClick={handelBackButton}>
            Back
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default RightTabPreview;
