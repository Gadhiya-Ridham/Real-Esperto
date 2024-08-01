import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import * as Icon from "react-bootstrap-icons";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Db_tab_2() {
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem("email");

  const fetchData = useCallback(() => {
    axios
      .get("http://localhost:4040/getPropertyDetails")
      .then((response) => {
        const filteredDetails = response.data.filter(
          (detail) => detail.email === userEmail
        );
        setPropertyDetails(filteredDetails);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      });
  }, [userEmail]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div className="p-error-1">{error}</div>;
  }

  const handleEditData = async (id) => {
    try {
      const property = propertyDetails.find((e) => e._id === id);
      if (property) {
        const propertyStore = {
          amenities: { ...property.amenities },
          area: property.area,
          baths: property.baths,
          beds: property.beds,
          bedroom: property.bedroom,
          city: property.city,
          country: property.country,
          delarChargeForBuy: property.delarChargeForBuy,
          delarChargeForRent: property.delarChargeForRent,
          discount: property.discount,
          email: property.email,
          hostJoinDate: property.hostJoinDate,
          hostName: property.hostName,
          parking: property.parking,
          postalCode: property.postalCode,
          price: property.price,
          rent: property.rent,
          rentalForm: property.rentalForm,
          review: property.review, // Corrected: Remove the duplicate key
          state: property.state,
          street: property.street,
          rating: property.rating, // Changed from review to rating
          propertyName: property.propertyName,
          propertyType: property.propertyType,
        };
        const dataSet = {
          email: property.email,
          propertyName: property.propertyName,
          propertyInformation: property.propertyInformation,
          mainImage: property.mainImage,
          images: [property.image1, property.image2, property.image3, property.image4],
          hostInfromation: property.hostInfromation,
        };
        localStorage.setItem("propertyDetails", JSON.stringify(propertyStore));
        localStorage.setItem("editEmail", propertyStore.email);
        try {
          const response = await fetch("http://localhost:4040/addImages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataSet),
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error saving Information:", error);
          toast.error("Error saving Information. Please try again later.");
          return;
        }
        setTimeout(() => {
          navigate("/add-Property-1");
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred. Please try again later.");
    }
  };

  const handleDeleteData = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `http://localhost:4040/deletePropretyDetailsByAdmin/${id}`
      );
      toast.success("Property deleted successfully");
      console.log("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property. Please try again later.");
    }
    setIsLoading(false);
  };

  const LikeProperty = (id) => {
    if (likedCards.includes(id)) {
      setLikedCards(likedCards.filter((cardId) => cardId !== id));
    } else {
      setLikedCards([...likedCards, id]);
    }
  };

  const addProperty = () => {
    navigate("/add-Property-1");
  };

  const CardOpenByID = (id) => {
    navigate(`/Property/${id}`);
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="db-box-2">
        <div className="db-text-1">Your Listings</div>
        <div className="db-btn-2" onClick={addProperty}>
          Add Listings
        </div>
        <div className="db-line-1"></div>
        {isLoading ? (
          <div className="loading-screen-1">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            {propertyDetails.length === 0 ? (
              <div className="db-box-2">
                No property found. Please add a new property.
              </div>
            ) : (
              <div className="card-db">
                {propertyDetails.map((property) => {
                  const isLiked = likedCards.includes(property._id);
                  return (
                    <div className="card-5" key={property._id}>
                      <div className="img-card-5">
                        <div className="discount-badge-5">
                          -{property.discount}% today
                        </div>
                        <div className="img-scroll-5">
                          <img
                            src={`data:image/jpeg;base64,${property.mainImage}`}
                            alt={property.propertyName} // Improved alt attribute
                            className="img-5"
                          />
                        </div>
                      </div>
                      <div className="desc-card-5">
                        <div className="like-btn-5">
                          <Icon.SuitHeartFill
                            className={`icon-like-5 ${isLiked ? "liked" : ""}`}
                            onClick={() => LikeProperty(property._id)}
                          />
                        </div>
                        <div className="badge-5">
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
                          <h2>{property.propertyName}</h2>
                        </div>
                        <div className="facility-5">
                          <div className="fac-5">
                            <IoBedOutline className="icon-fac-5" />
                            <span>{property.beds} beds</span>
                          </div>
                          <div className="fac-5">
                            <PiBathtub className="icon-fac-5" />
                            <span>{property.baths} baths</span>
                          </div>
                          <div className="fac-5">
                            <LiaExpandArrowsAltSolid className="icon-fac-5" />
                            <span>{property.area} Sq. Ft</span>
                          </div>
                        </div>
                        <div className="line-5"></div>
                        <div className="ls-box-5">
                          <div className="review-5">
                            <Icon.StarFill className="icon-rev-5" />
                            {property.rating}
                          </div>
                          <Link to={`/Property/${property._id}`}>
                            <div
                              className="price-5"
                              onClick={() => CardOpenByID(property._id)}
                            >
                              $ {property.price}
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="admin-control-btn-box">
                        <div
                          className="admin-property-btn1"
                          onClick={() => handleEditData(property._id)}
                        >
                          Edit
                        </div>
                        <div
                          className="admin-property-btn1"
                          onClick={() => handleDeleteData(property._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Db_tab_2;
