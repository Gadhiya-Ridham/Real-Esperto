import React from "react";
import { useNavigate, useParams } from "react-router";
import "./admin-css.css";
import * as icons from "react-bootstrap-icons";
import { useCookies } from "react-cookie";
import AdminTab1 from "./Admin_tab1";
import AdminTab3 from "./Admin_tab3";
import AdminTab4 from "./Admin_tab4";

function AdminPanel() {
  const navigate = useNavigate();
  const profileImage = sessionStorage.getItem("profileImage");
  const Fname = sessionStorage.getItem("Fname");
  const Lname = sessionStorage.getItem("Lname");
  const { tabNumber } = useParams();
  const [cookies, removeCookie] = useCookies([]);
  console.log(cookies)
  

  const Logout = () => {
    navigate("/login");
    sessionStorage.clear();
    localStorage.clear();
    removeCookie("token");
  };

  return (
    <>
      <div className="admin-sidebar">
        <div className="admin-sb-name-box">
          <div className="profileImage-admin">
            <img
              src={`data:image/png;base64,${profileImage}`}
              alt="profile"
              id="displayProfilePic"
              className="admin-profile-image"
            />
          </div>
          <div className="admin-name">
            {Fname} {Lname}
          </div>
        </div>
        <div className="admin-link-box">
          <ul className="admin-ul">
            <li
              className={
                tabNumber === "1" ? "admin-li active-admin" : "admin-li "
              }
              onClick={() => navigate("/admin/1")}
            >
              <icons.People className="admin-icon" />
              User Details
            </li>

            <li
              className={
                tabNumber === "2" ? "admin-li active-admin" : "admin-li "
              }
              onClick={() => navigate("/admin/2")}
            >
              <icons.GearWide className="admin-icon" />
              Property Details
            </li>
            <li
              className={
                tabNumber === "4" ? "admin-li active-admin" : "admin-li "
              }
              onClick={() => navigate("/admin/4")}
            >
              <icons.CreditCardFill className="admin-icon" />
              Payment Details
            </li>
            <li
              className={
                tabNumber === "5" ? "admin-li active-admin" : "admin-li "
              }
              onClick={Logout}
            >
              <icons.BoxArrowRight className="admin-icon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="admin-container">
        {tabNumber === "1" && <AdminTab1 />}
        {tabNumber === "2" && <AdminTab3 />}
        {tabNumber === "4" && <AdminTab4 />}
      </div>
    </>
  );
}

export default AdminPanel;
