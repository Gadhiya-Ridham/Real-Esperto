import React, { useEffect, useState, useCallback } from "react";
import "../../../property/property-tab/property-tab/2/tab2.css";
import axios from "axios";

const Property_Details = () => {
  return JSON.parse(localStorage.getItem("propertyDetails"));
};

function Tab2Preview() {
  const property = Property_Details();
  const propertyName = property.propertyName;
  const email = property.email;
  const [information, setInformation] = useState("");

  const fetchImages = useCallback(async () => {
    try {
      if (email && propertyName) {
        const response = await axios.get(
          `http://localhost:4040/getImages?email=${email}&propertyName=${propertyName}`
        );
        const imageData = response.data;
        setInformation(imageData.propertyInformation);
      }
    } catch (error) {
      console.error("Error fetching images", error);
    }
  }, [email, propertyName]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <>
      {property ? (
        <div className="property-box-2">
          <div className="prt-box-2-1">Property information</div>
          <div className="prt-line-2"></div>
          <div className="prt-box-2-2">
            <p>{information}</p>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Tab2Preview;
