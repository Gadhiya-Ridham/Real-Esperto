import React, { useEffect, useState, useCallback } from "react";
import "../../../property/property-tab/property.css";
import axios from "axios";

const Property_Details = () => {
  return JSON.parse(localStorage.getItem("propertyDetails"));
};

function ImageTabPreview() {
  const property = Property_Details();
  const propertyName = property.propertyName;
  const email = property.email;
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const image1 = images[0];
  const image2 = images[1];
  const image3 = images[2];
  const image4 = images[3];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      if (email && propertyName) {
        const response = await axios.get(
          `http://localhost:4040/getImages?email=${email}&propertyName=${propertyName}`
        );
        const imageData = response.data;
        setMainImage(imageData.mainImage);
        setImages(imageData.images);
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
        <div className="property-images-top">
          <div className="property-main-img">
            <img
              src={`data:image/jpeg;base64,${mainImage}`}
              alt="Main property view"
              className="property-img-main i-1"
            />
          </div>
          <div className="property-main-img">
            <div className="property-grp-1">
              <img
                src={`data:image/jpeg;base64,${image1}`}
                alt="View 1"
                className="property-img i-2"
              />
              <img
                src={`data:image/jpeg;base64,${image2}`}
                alt="View 2"
                className="property-img i-3"
              />
            </div>
            <div className="property-grp-1">
              <img
                src={`data:image/jpeg;base64,${image3}`}
                alt="View 3"
                className="property-img i-2"
              />
              <img
                src={`data:image/jpeg;base64,${image4}`}
                alt="View 4"
                className="property-img i-3"
              />
            </div>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default ImageTabPreview;
