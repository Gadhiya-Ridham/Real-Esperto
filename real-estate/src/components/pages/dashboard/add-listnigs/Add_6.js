import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import { MdCloudUpload } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Add_6() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const email = localStorage.getItem("email");
  const propertyDetailsString = localStorage.getItem("propertyDetails");
  const propertyDetails = JSON.parse(propertyDetailsString);
  const propertyName = propertyDetails ? propertyDetails.propertyName : "";

  const goToPreviousPage = () => {
    navigate("/add-Property-5");
  };

  const goToNextPage = async () => {
    if (!mainImage) {
      toast.error("Property cover image cannot be empty");
    } else {
      try {
        const imageData = {
          email,
          propertyName,
          images,
          mainImage,
        };
        const response = await fetch("http://localhost:4040/addImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageData),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error saving images:", error);
        toast.error("Error saving images. Please try again later.");
        return;
      }
      setTimeout(() => {
        navigate("/add-Property-7");
      }, 1000);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setMainImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesUpload = (index, event) => {
    if (event && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        const newImages = [...images];
        newImages[index] = base64String;
        setImages(newImages);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const fetchImages = async () => {
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
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, propertyName]);

  const RenderImageUploadForms = () => {
    const emptyBoxesCount = Math.max(4 - images.length, 0);
    const emptyBoxes = Array.from({ length: emptyBoxesCount }).fill(null);

    return (
      <>
        {images.map((image, index) => (
          <div className="add-image-box" key={index}>
            <h5>Image {index + 1}</h5>
            <form
              action=""
              className="add-form"
              onClick={() =>
                document.querySelector(`#add-input-fields-${index}`).click()
              }
            >
              <input
                type="file"
                accept="image/*"
                id={`add-input-fields-${index}`}
                className="add-input-fields"
                hidden
                onChange={(event) => handleImagesUpload(index, event)}
              />
              {image ? (
                <div>
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    className="add-img"
                    alt={`Uploaded  ${index + 1}`}
                  />
                </div>
              ) : (
                <>
                  <MdCloudUpload color="#1475cf" size={60} />
                  <p>Browse Files to upload</p>
                </>
              )}
            </form>
          </div>
        ))}
        {emptyBoxes.map((_, index) => (
          <div className="add-image-box" key={images.length + index}>
            <h5>Image {images.length + index + 1}</h5>
            <form
              action=""
              className="add-form"
              onClick={() =>
                document
                  .querySelector(`#add-input-fields-${images.length + index}`)
                  .click()
              }
            >
              <input
                type="file"
                accept="image/*"
                id={`add-input-fields-${images.length + index}`}
                className="add-input-fields"
                hidden
                onChange={(event) =>
                  handleImagesUpload(images.length + index, event)
                }
              />
              <MdCloudUpload color="#1475cf" size={60} />
              <p>Browse Files to upload</p>
            </form>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />

      <div className="add-box">
        <div className="add-count">
          <h1>
            06 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Picture of the place</div>
          <div className="add-sub-title">
            A few beautiful photos will help customers have more sympathy for
            your property.
          </div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <div className="add-image-box">
              <h5>Property cover image</h5>
              <form
                action=""
                className="add-form"
                onClick={() =>
                  document.querySelector(".add-input-fields").click()
                }
              >
                <input
                  type="file"
                  accept="image/*"
                  className="add-input-fields"
                  hidden
                  onChange={handleImageUpload}
                />
                {mainImage ? (
                  <img
                    src={`data:image/jpeg;base64,${mainImage}`}
                    id="displayMainImage"
                    className="add-img"
                    alt="Property cover"
                  />
                ) : (
                  <>
                    <MdCloudUpload color="#1475cf" size={60} />
                    <p>Browse Files to upload</p>
                  </>
                )}
              </form>
            </div>
            {RenderImageUploadForms()}
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

export default Add_6;
