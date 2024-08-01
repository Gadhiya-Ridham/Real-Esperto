import React, { useState, useEffect, useCallback } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Add_5() {
  const navigate = useNavigate();
  const [propertyInformation, setPropertyInformation] = useState("");
  const email = localStorage.getItem("email");
  const propertyDetailsString = localStorage.getItem("propertyDetails");
  const propertyDetails = JSON.parse(propertyDetailsString);
  const propertyName = propertyDetails ? propertyDetails.propertyName : "";

  const goToPreviousPage = () => {
    navigate("/add-Property-4");
  };

  const goToNextPage = async () => {
    if (!propertyInformation) {
      toast.error("Please provide property information.");
    } else {
      try {
        const formData = {
          email,
          propertyName,
          propertyInformation,
        };
        const response = await fetch("http://localhost:4040/addImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        navigate("/add-Property-6");
      } catch (error) {
        console.error("Error saving Information:", error);
        toast.error("Error saving Information. Please try again later.");
        return;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "propertyInformation") {
      setPropertyInformation(value);
    }
  };

  const fetchInformation = useCallback(async () => {
    try {
      if (email && propertyName) {
        const response = await axios.get(
          `http://localhost:4040/getImages?email=${email}&propertyName=${propertyName}`
        );
        const imageData = response.data;
        setPropertyInformation(imageData.propertyInformation);
      }
    } catch (error) {
      console.error("Error fetching information", error);
    }
  }, [email, propertyName]);

  useEffect(() => {
    fetchInformation();
  }, [fetchInformation]);

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            05 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Your place description for client</div>
          <div className="add-sub-title">
            Mention the best features of your accommodation, any special
            amenities like fast Wi-Fi or parking, as well as things you like
            about the neighborhood.
          </div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <textarea
              placeholder="..."
              id="propertyInformation"
              name="propertyInformation"
              className="add-discription"
              value={propertyInformation}
              onChange={handleChange}
            ></textarea>
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

export default Add_5;
