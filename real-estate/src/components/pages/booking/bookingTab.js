import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./booking.css";
import * as Icon from "react-bootstrap-icons";
import visa from "./visa.png";
import masterCard from "./master.svg";

function BookingTab(props) {
  const { property, id, activeState } = props;
  const [isActive, setActive] = useState("Gpay");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [crn, setCRNNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [name, setName] = useState("");
  const email = localStorage.getItem("email");
  const paymentMode = isActive;
  const [count, setCount] = useState(12);

  const date = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const bookingCode = `#${generateRandomCode()}`;
  const rentTiming = activeState === "rent" ? `${count} days` : null;

  const changeActive = (button) => setActive(button);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "upiId") {
      setUpiId(value);
    } else if (name === "cardNumber") {
      handleCardNumberChange(e);
    } else if (name === "expiryDate") {
      setExpiryDate(value);
    } else if (name === "crn") {
      setCRNNumber(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 12).replace(/(.{4})/g, "$1 ");
    setCardNumber(value);
  };

  const calculateDiscountPrice = (original, discount, dealerCharge) => {
    const discountAmount = original * (discount / 100);
    const discountPrice = original - discountAmount;
    return (discountPrice + dealerCharge).toFixed(2);
  };

  const handleSubmit = async () => {
    const formData = {
      email,
      paymentMode,
      paymentValue: price(),
      propertyType: activeState,
      propertyName: property.propertyName,
      rentTiming,
      bookingCode,
    };

    if (isActive === "Gpay") {
      if (!upiId || !date) {
        toast.warn("UPI ID and Date cannot be empty.");
        return;
      }
      if (!upiId.includes("@")) {
        toast.warn("Invalid UPI ID. Please include '@' symbol.");
        return;
      }
      formData.upiId = upiId;
    } else if (isActive === "creditCard") {
      if (!date || !cardNumber || !expiryDate || !crn || !name) {
        toast.warn("All fields are required for credit card payment.");
        return;
      }
      formData.cardNumber = cardNumber;
      formData.expiryDate = expiryDate;
      formData.crn = crn;
      formData.name = name;
    }

    try {
      const response = await fetch("http://localhost:4040/addPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response data:", data);
      toast.success("Payment Done!");
      setTimeout(() => {
        navigate(`/Pay-done/${id}?date=${date}&activeState=${activeState}&price=${price()}&active=${isActive}&bookingCode=${bookingCode}`);
      }, 2000);
    } catch (error) {
      toast.error("Error storing form data");
      console.error("Error storing form data:", error.message);
    }
  };

  const price = () => {
    if (activeState === "buy") {
      return calculateDiscountPrice(
        property.price,
        property.discount,
        property.delarChargeForBuy
      );
    } else {
      return calculateDiscountPrice(
        property.rent,
        property.discount,
        property.delarChargeForRent
      );
    }
  };

  if (!property) {
    return <div>No data available</div>;
  }

  return (
    <>
      <ToastContainer position="bottom-right" className="custome_toast" />
      <div className="bkg-container-1">
        <div className="bkg-box-left">
          <div className="bkg-lf-box-1">
            <h1>Confirm and payment</h1>
            <div className="bkg-line-1"></div>
            <p>Your trip</p>
            <div className="bkg-bx-1">
              <div className="bkg-inn-box-1">
                <div className="date">Date</div>
                <div className="calender">
                  <input
                    type="date"
                    id="date"
                    className="date-box-1"
                    defaultValue={date}
                  />
                </div>
              </div>
              <div className="bkg-inn-box-1">
                {activeState === "buy" && (
                  <>
                    <div className="bkg_box_1">Family</div>
                    <div className="bkg_box_2">
                      Perfect fit for {property.beds} Members
                    </div>
                  </>
                )}
                {activeState === "rent" && (
                  <>
                    <div className="bkg_box_1">No. of Months</div>
                    <div className="bkg_box_2">
                      {count} Months
                      <div className="minus count" onClick={() => setCount(count - 1)}>
                        -
                      </div>
                      <div className="plus count" onClick={() => setCount(count + 1)}>
                        +
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <p>Pay with</p>
            <div className="bkg-line-2"></div>
            <div className="bkg-bx-2">
              <button
                className={`bkg-btn-1 ${isActive === "Gpay" ? "active-bkg" : ""}`}
                onClick={() => changeActive("Gpay")}
              >
                GPay
              </button>
              <button
                className={`bkg-btn-2 ${isActive === "creditCard" ? "active-bkg" : ""}`}
                onClick={() => changeActive("creditCard")}
              >
                <span>Credit card</span>
                <img src={visa} alt="" className="bkg-img-1" />
                <img src={masterCard} alt="" className="bkg-img-2" />
              </button>
            </div>
            {isActive === "Gpay" && (
              <>
                <div className="bkg-bx-3">
                  <label className="Text-bill">UPI ID</label>
                  <br />
                  <input
                    type="email"
                    id="upiId"
                    name="upiId"
                    className="input-bil"
                    onChange={handleChange}
                    value={upiId}
                    placeholder="upiid@bankoxis"
                  />
                </div>
                <button className="bkg-bx-4" onClick={handleSubmit}>
                  Confirm and pay
                </button>
              </>
            )}
            {isActive === "creditCard" && (
              <>
                <div className="bkg-bx-3">
                  <label className="Text-bill">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    className="input-bil"
                    id="cardNumber"
                    onChange={handleChange}
                    placeholder="Enter card number"
                  />
                  <div className="number-bill">
                    <div className="box-1-bil">
                      <label className="Text-bill">Exp Date</label>
                      <input
                        type="month"
                        id="expiryDate"
                        className="input-bil-s"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="box-1-bil">
                      <label className="Text-bill">CVC number</label>
                      <br />
                      <input
                        type="text"
                        value={crn}
                        id="crnNumber"
                        onChange={handleChange}
                        className="input-bil-s"
                        placeholder="Enter CVC"
                      />
                    </div>
                  </div>
                  <label className="Text-bill">Name</label>
                  <input
                    type="text"
                    className="input-bil"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <button className="bkg-bx-4" onClick={handleSubmit}>
                  Confirm and pay
                </button>
              </>
            )}
          </div>
        </div>
        <div className="bkg-box-right">
          <div className="bkg-bx-rg-1">
            <div className="bkg-img-rg">
              <img
                src={`data:image/jpeg;base64,${property.mainImage}`}
                alt={`id:`}
                className="bkg-card-img"
              />
            </div>
            <div className="bkg-main-card-rg">
              <div className="bkg-card-rg-1">Hotel room in {property.city}</div>
              <div className="bkg-card-rg-2">{property.propertyName}</div>
              <div className="bkg-card-rg-3">
                {property.beds} beds <div className="bkg-dot"></div> {property.baths} baths
              </div>
              <div className="bkg-line-rg-1"></div>
              <div className="bkg-card-rg-4">
                <Icon.StarFill className="icon-rev-5" />
                {property.rating}
              </div>
            </div>
          </div>
          <div className="bkg-bx-rg-1">
            <div className="text_1">Price detail</div>
            <div className="calculate-1">
              <div className="lf">
                {activeState === "rent" ? "Rent for property" : "Price of property"}
              </div>
              <div className="rg">${activeState === "rent" ? property.rent : property.price}</div>
            </div>
            <div className="discount">
              <div className="lf">Discount</div>
              <div className="rg">{property.discount} %</div>
            </div>
            <div className="line_bkh_1"></div>
            <div className="total">
              <div className="lf">Total</div>
              <div className="rg">${price()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function generateRandomCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  return randomLetters + randomNumber;
}

export default BookingTab;
