import React, { useState, useEffect, useCallback } from "react";
import "./admin-css.css";
import { useNavigate } from "react-router";
import * as Icon from "react-bootstrap-icons";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Admin_tab3() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  console.log(refreshData);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  function tick() {
    setCurrentTime(new Date());
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4040/getPropertyDetails");
      setPropertyDetails(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching data. Please try again later.");
      setIsLoading(false);
    }
  }, []); // Removed `refreshData` from dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setLength(propertyDetails.length);
  }, [propertyDetails]);

  const handleEditData = async (id) => {
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
        review: property.review,
        state: property.state,
        street: property.street,
        rating: property.rating, // Renamed from review to rating
        propertyName: property.propertyName,
        propertyType: property.propertyType,
      };

      localStorage.setItem("propertyDetails", JSON.stringify(propertyStore));
      localStorage.setItem("editEmail", propertyStore.email);

      setTimeout(() => {
        navigate("/add-Property-1");
      }, 500);
    }
  };

  const handleDeleteData = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4040/deletePropretyDetailsByAdmin/${id}`);
      toast.success("Property deleted successfully");
      setRefreshData(prev => !prev);
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer position="bottom-right" className="custom_toast" />
      <div className="admin-2-conatiner">
        <div className="admin-1-boxs-1">
          <div className="admin-user-count">No. of Property : {length}</div>
          <div className="admin-current-time">
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="admin-1-boxs-3">
          <div className="admin-container-1">
            <div className="admin-card-box-5">
              {isLoading ? (
                <div className="loding-screen">
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                propertyDetails.map((e) => (
                  <div className="admin-imp-box" key={e._id}>
                    <div className="card-5">
                      <div className="img-card-5">
                        <div className="discount-badge-5">
                          -{e.discount}% today
                        </div>
                        <div className="img-scroll-5">
                          <img
                            src={`data:image/jpeg;base64,${e.mainImage}`}
                            alt="property"
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
                            {e.rating}
                          </div>
                          <Link to={`/Property/${e._id}`}>
                            <div className="price-5" onClick={() => handleEditData(e._id)}>
                              $ {e.price}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="side-box-property-admin">
                      <div className="admin-sp-box-property">
                        <div className="admin-prty-image">
                          <img
                            src={`data:image/jpeg;base64,${e.hostImage}`}
                            alt="profile"
                            className="admin-table-image-3"
                          />
                        </div>
                        <div className="admin-name-prty">{e.hostName}</div>
                      </div>
                      <div className="admin-joinDate-prty">
                        {e.hostJoinDate}
                        <div className="admin-address-prty">{e.street}</div>
                      </div>
                      <div className="admin-desc-prty">
                        {e.propertyInformation}
                      </div>
                      <div className="admin-controll-btn-box">
                        <div
                          className="admin-property-btn1"
                          onClick={() => handleEditData(e._id)}
                        >
                          Edit
                        </div>
                        <div
                          className="admin-property-btn1"
                          onClick={() => handleDeleteData(e._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_tab3;
