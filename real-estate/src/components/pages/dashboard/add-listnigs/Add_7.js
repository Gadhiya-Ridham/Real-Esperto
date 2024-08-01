import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_7() {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [delarChargeForBuy, setDelarChargeForBuy] = useState("");
  const [delarChargeForRent, setDelarChargeForRent] = useState("");
  const [discount, setDiscount] = useState("");
  const [review, setReview] = useState(5);

  const goToPreviousPage = () => {
    navigate("/add-Property-6");
  };

  const goToNextPage = () => {
    if (
      !price ||
      !rent ||
      !delarChargeForBuy ||
      !delarChargeForRent ||
      !discount
    ) {
      toast.error("All Fields are required");
    } else {
      const storedPropertyDetails = localStorage.getItem("propertyDetails");
      let updatedPropertyDetails = {};
      if (storedPropertyDetails) {
        updatedPropertyDetails = JSON.parse(storedPropertyDetails);
      }
      updatedPropertyDetails = {
        ...updatedPropertyDetails,
        price: price,
        rent: rent,
        delarChargeForBuy: delarChargeForBuy,
        delarChargeForRent: delarChargeForRent,
        discount: discount,
        review: review,
      };

      localStorage.setItem(
        "propertyDetails",
        JSON.stringify(updatedPropertyDetails)
      );
      navigate("/add-Property-8");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "price":
        const Value1 = parseFloat(value);
        setPrice(isNaN(Value1) ? "" : Value1);
        break;
      case "rent":
        const Value2 = parseFloat(value);
        setRent(isNaN(Value2) ? "" : Value2);
        break;
      case "delarChargeForBuy":
        const Value3 = parseFloat(value);
        setDelarChargeForBuy(isNaN(Value3) ? "" : Value3);
        break;
      case "delarChargeForRent":
        const Value4 = parseFloat(value);
        setDelarChargeForRent(isNaN(Value4) ? "" : Value4);
        break;
      case "discount":
        const Value5 = parseFloat(value);
        setDiscount(isNaN(Value5) ? "" : Value5);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem("propertyDetails");
    if (storedPropertyDetails) {
      const parsedPropertyDetails = JSON.parse(storedPropertyDetails);
      setPrice(parsedPropertyDetails.price);
      setRent(parsedPropertyDetails.rent);
      setDelarChargeForBuy(parsedPropertyDetails.delarChargeForBuy || 20000);
      setDelarChargeForRent(parsedPropertyDetails.delarChargeForRent || 2000);
      setDiscount(parsedPropertyDetails.discount || 10);
      setReview(parsedPropertyDetails.review || 5);
    }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            07 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Price your space</div>
          <div className="add-sub-title">
            The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.
          </div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <div className="add-price-box">
              <label className="add-label-1">Price for Buy</label>
              <input
                type="text"
                className="add-input"
                id="price"
                name="price"
                value={price}
                onChange={handleInputChange}
                placeholder="Price for Buy"
              />
              <label className="add-label-1">Price for Rent</label>
              <input
                type="text"
                className="add-input"
                id="rent"
                name="rent"
                value={rent}
                onChange={handleInputChange}
                placeholder="Price for Rent"
              />
              <label className="add-label-1">Delar Charge for Buy</label>
              <input
                type="text"
                className="add-input"
                id="delarChargeForBuy"
                name="delarChargeForBuy"
                value={delarChargeForBuy}
                onChange={handleInputChange}
                placeholder="Delar Charge for Buy"
              />
              <label className="add-label-1">Delar Charge for Rent</label>
              <input
                type="text"
                className="add-input"
                id="delarChargeForRent"
                name="delarChargeForRent"
                value={delarChargeForRent}
                onChange={handleInputChange}
                placeholder="Delar Charge for Rent"
              />
              <label className="add-label-1">Discount</label>
              <input
                type="text"
                className="add-input"
                id="discount"
                name="discount"
                value={discount}
                onChange={handleInputChange}
                placeholder="Discount"
              />
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

export default Add_7;
