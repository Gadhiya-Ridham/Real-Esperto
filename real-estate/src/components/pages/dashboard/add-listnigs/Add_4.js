import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_4() {
  const navigate = useNavigate();

  const [amenities, setAmenities] = useState(() => {
    const initialAmenities = {
      key: true,
      luggage: false,
      shower: true,
      spa: false,
      swimmingPool: false,
      tv: true,
      utensils: false,
      wifi: false,
      bath_a: true,
      bed_a: false,
      parking_a: true,
      kitchen: true,
      hotTube: false,
      jacuzzi: false,
      security: false,
      playArea: false,
      cinemaHall: false,
      frontPorch: false,
      gym: false,
      airConditioning: true,
      balcony: true,
    };
    for (let amenity in initialAmenities) {
      const storedAmenity = localStorage.getItem(amenity);
      if (storedAmenity !== null) {
        initialAmenities[amenity] = storedAmenity === "true";
      }
    }

    return initialAmenities;
  });


  const goToPreviousPage = () => {
    navigate("/add-Property-3");
  };

  const goToNextPage = () => {
    const checkedCount = Object.values(amenities).filter(
      (value) => value
    ).length;
    if (checkedCount < 12) {
      toast.error(
        `You have chosen ${checkedCount} amenities. Please select at least ${
          12 - checkedCount
        } more.`
      );
    } else {
      const storedPropertyDetails = localStorage.getItem("propertyDetails");
      let updatedPropertyDetails = {};

      if (storedPropertyDetails) {
        updatedPropertyDetails = JSON.parse(storedPropertyDetails);
      }
      updatedPropertyDetails = {
        ...updatedPropertyDetails,
        amenities: amenities,
      };
      localStorage.setItem(
        "propertyDetails",
        JSON.stringify(updatedPropertyDetails)
      );
      navigate("/add-Property-5");
    }
  };

  const generateCheckboxes = (amenitiesList) => {
    return amenitiesList.map((amenity, index) => (
      <div className="add-check-box-4" key={index}>
        <input
          type="checkbox"
          className="add-checkbox"
          id={`check-${amenity}`}
          checked={amenities[amenity]}
          onChange={() => handleCheckBox(amenity)}
        />
        <label className="add-amenities-name">{amenity}</label>
      </div>
    ));
  };

  const generalAmenities = [
    "key",
    "luggage",
    "shower",
    "spa",
    "swimmingPool",
    "tv",
    "utensils",
    "wifi",
    "bath",
    "beds",
    "parking",
    "kitchen",
    "hotTube",
    "jacuzzi",
    "security",
    "playArea",
    "cinemaHall",
    "frontPorch",
    "gym",
    "airConditioning",
    "balcony",
  ];

  const handleCheckBox = (amenity) => {
    setAmenities({ ...amenities, [amenity]: !amenities[amenity] });
  };

  useEffect(() => {
    const storedPropertyDetails = localStorage.getItem("propertyDetails");

    if (storedPropertyDetails) {
      const parsedPropertyDetails = JSON.parse(storedPropertyDetails);

      const storedAmenities = parsedPropertyDetails.amenities;

      if (storedAmenities) {
        setAmenities(storedAmenities);
      }
    }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            04 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Amenities</div>
          <div className="add-sub-title">
            Many customers have searched for accommodation based on amenities
            criteria
          </div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <div className="add-text-4">General amenities</div>
            <div className="add-amenities-box">
              {generateCheckboxes(generalAmenities)}
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

export default Add_4;
