import React, { useState, useEffect } from "react";
import "./addListnings.css";
import { useNavigate } from "react-router";
import * as Icon from "react-bootstrap-icons";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Property_Details = () => {
  return JSON.parse(localStorage.getItem("propertyDetails"));
};

function Add_8() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [propertyInformation, setPropertyInformation] = useState("");
  const email = localStorage.getItem("email");
  const e = Property_Details();
  const propertyName = e?.propertyName;
  const hostInformation = sessionStorage.getItem("about");
  const hostImage = sessionStorage.getItem("profileImage");

  const goToHome = async () => {
    if (email === "admin@gmail.com") {
      navigate("/admin/2");
    } else {
      navigate("/");
    }
    localStorage.removeItem("propertyDetails");
    try {
      const response = await fetch(
        "http://localhost:4040/deleteDataFromPropertyImages",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (email && propertyName) {
          const response = await axios.get(
            `http://localhost:4040/getImages?email=${email}&propertyName=${propertyName}`
          );
          const imageData = response.data;
          setPropertyInformation(imageData.propertyInformation);
          setMainImage(imageData.mainImage);
          setImages(imageData.images);
        }
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    const fetchItem = async () => {
      try {
        if (email && propertyName) {
          const response = await axios.get(
            `http://localhost:4040/getData?email=${email}&propertyName=${propertyName}`
          );
          const item = response.data;
          setId(item.id);
        }
      } catch (error) {
        console.error("Error fetching item", error);
      }
    };

    fetchImages();
    fetchItem();
  }, [email, propertyName]);

  const image1 = images[0];
  const image2 = images[1];
  const image3 = images[2];
  const image4 = images[3];

  const goToNextPage = async () => {
    try {
      const formData = {
        ...e,
        propertyInformation,
        hostInformation,
      };

      const formDataWithImages = {
        ...formData,
        mainImage,
        hostImage,
        image1,
        image2,
        image3,
        image4,
      };
      const response = await fetch("http://localhost:4040/addProperties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithImages),
      });
      const data = await response.json();
      toast.success("Property added successfully...");
      console.log(data);
    } catch (error) {
      console.error("Error publishing listing:", error);
      toast.error("Error publishing listing");
    }
  };

  if (!e?.email === email) {
    return (
      <>
        <ToastContainer position="bottom-right" className="custom_toast" />
        <div className="add-box">
          <div className="add-count">
            <h1>
              08 <span>/ 8</span>
            </h1>
          </div>
          <div className="add-main-box">
            <div className="add-card-box-">
              No properties found for the given username.
            </div>
          </div>
          <div className="add-btn-box">
            <div className="add-btn-1" onClick={goToHome}>
              Home
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="add-box">
        <div className="add-count">
          <h1>
            08 <span>/ 8</span>
          </h1>
        </div>
        <div className="add-main-box">
          <div className="add-title">Congratulations 🎉</div>
          <div className="add-sub-title">
            Excellent, congratulations on completing the listing, it is waiting
            to be reviewed for publication
          </div>
          <div className="add-line"></div>
          <div className="add-box-1">
            <div className="add-text-8">This is your listing</div>
            <div className="add-card-box-8">
              <div className="card-5" key={e.id}>
                <div className="img-card-5">
                  <div className="discount-badge-5">-{e.discount}% today </div>
                  <div className="img-scroll-5">
                    <img
                      src={`data:image/jpeg;base64,${mainImage}`}
                      alt="Property main "
                      className="img-5"
                    />
                  </div>
                </div>
                <div className="desc-card-5">
                  <div className="bagde-5">
                    <div className="bg-5 bg-clr-1">
                      <Icon.Share className="icon-bg-5 bg-clr-1" />
                      <span className="bg-clr-1">4 Network</span>
                    </div>
                    <div className="bg-5 bg-clr-2">
                      <Icon.PeopleFill className="icon-bg-5 bg-clr-2" />
                      <span className="bg-clr-2">Family</span>
                    </div>
                  </div>
                  <div className="title-5">
                    <h2>{e.propertyName}</h2>
                  </div>
                  <div className="facility-5">
                    <div className="fac-5">
                      <IoBedOutline className="icon-fac-5" />
                      <span>{e.beds} beds</span>
                    </div>
                    <div className="fac-5">
                      <PiBathtub className="icon-fac-5" />
                      <span>{e.baths} baths</span>
                    </div>
                    <div className="fac-5">
                      <LiaExpandArrowsAltSolid className="icon-fac-5" />
                      <span>{e.area} Sq. Ft</span>
                    </div>
                  </div>
                  <div className="line-5"></div>
                  <div className="ls-box-5">
                    <div className="review-5">
                      <Icon.StarFill className="icon-rev-5" />
                      {e.review}
                    </div>
                    <div className="price-5">$ {e.price}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-btn-8-box">
              <div
                className="add-btn-1 add-btn-sp"
                onClick={() => navigate(`/add-Property-1`)}
              >
                <FaRegEdit className="add-icon-8" /> Edit
              </div>
              <div
                className="add-btn-2 add-btn-sp"
                onClick={() => navigate(`/preview`)}
              >
                <FaRegEye className="add-icon-8" /> Preview
              </div>
            </div>
          </div>
        </div>
        <div className="add-btn-box">
          <div className="add-btn-2" onClick={goToNextPage}>
            Publish listing
          </div>
          <div className="add-btn-1" onClick={goToHome}>
            Home
          </div>
        </div>
        {id}
      </div>
    </>
  );
}

export default Add_8;
