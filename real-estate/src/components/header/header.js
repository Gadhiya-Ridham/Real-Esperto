import { useState, useEffect, React } from "react";
import "./header.css";
import * as Icon from "react-bootstrap-icons";
import { menuItems, Register, sideBar } from "./menuItem";
import logo_img from "../pages/images/logo.png";
import { FaGreaterThan } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearch, setIsSearch] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isPSHOW, setIsPShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const email = sessionStorage.getItem("email");

  const setTheme = (theme) => (document.documentElement.className = theme);

  const sideBarToggle = (e) => {
    setIsSidebar(!isSidebar);
  };

  const mode = (e) => {
    setIsShow(!isShow);
  };

  const searchBar = (e) => {
    navigate("/search");
    setIsSearch(!isSearch);
  };

  const closeBar = (e) => {
    navigate("/");
    setIsSearch(!isSearch);
  };

  const profileShow = (e) => {
    setIsPShow(!isPSHOW);
  };

  const Profile = () => {
    navigate("/dashboard/1");
    profileShow();
  };

  const Listnings = () => {
    navigate("/dashboard/2");
    profileShow();
  };

  const viewProperty = () => {
    navigate("/dashboard/4");
    profileShow();
  };

  const viewUserDetails = () => {
    navigate("/admin");
    profileShow();
  };

  const Logout = () => {
    setIsLoggedIn(false);
    navigate("/login");
    profileShow();
    sessionStorage.clear();
    localStorage.clear();
    removeCookie("token");
  };

  var long = isSearch ? "long" : null;
  var show = isShow ? "show" : "hidden";
  var hidden = isShow ? "hidden" : "show";
  var hide = isSidebar ? null : "hide";
  var p_show = isPSHOW ? "profile-show" : null;

  useEffect(() => {
    const updateProfileImage = () => {
      const updateProfileImage = sessionStorage.getItem("profileImage");
      setProfileImage(updateProfileImage);
    };

    window.addEventListener("profileImageUpdated", updateProfileImage);

    return () => {
      window.removeEventListener("profileImageUpdated", updateProfileImage);
    };
  }, []);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token || location.pathname.includes("/login")) {
        navigate("/login");
        setIsLoggedIn(false);
        removeCookie("token");
        localStorage.clear();
        sessionStorage.clear();
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:4040",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        const Fname = sessionStorage.getItem("Fname");
        const Lname = sessionStorage.getItem("Lname");
        const gender = sessionStorage.getItem("gender");
        const salute =
          gender === "male" ? "Mr." : gender === "female" ? "Ms." : "Hello";
        const hostName = `${salute} ${Fname} ${Lname}`;

        if (status) {
          setfName(user.First_Name);
          setlName(user.Last_Name);
          sessionStorage.setItem("username", user.username);
          localStorage.setItem("username", user.username);
          sessionStorage.setItem("email", user.email);
          localStorage.setItem("email", user.email);
          sessionStorage.setItem("Fname", user.First_Name);
          sessionStorage.setItem("Lname", user.Last_Name);
          sessionStorage.setItem("gender", user.gender);
          sessionStorage.setItem("DOB", user.DOB);
          sessionStorage.setItem("address", user.address);
          sessionStorage.setItem("phoneNumber", user.phoneNumber);
          sessionStorage.setItem("about", user.about);
          sessionStorage.setItem("profileImage", user.profileImage);
          sessionStorage.setItem("hostJoinTime", user.hostJoinTime);
          localStorage.setItem("hostName", hostName);
          setProfileImage(sessionStorage.getItem("profileImage"));
          setIsLoggedIn(true);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();

    const handelLogoutEvent = () => {
      setIsLoggedIn(false);
    };

    window.addEventListener("storage", handelLogoutEvent);

    return () => {
      window.removeEventListener("storage", handelLogoutEvent);
    };
  }, [cookies, location.pathname, navigate, removeCookie]);

  if (email === "admin@gmail.com") {
    return (
      <>
        <header className="display-none-header"></header>
      </>
    );
  }

  return (
    <div>
      <header>
        <div className="left bg-trp">
          <img src={logo_img} alt="logo" className="logo" />
        </div>
        <div className="middle bg-trp">
          <ul>{menuItems}</ul>
        </div>
        <div className="right bg-trp">
          <div className="mb-menu hover">
            <Icon.List onClick={sideBarToggle} />
          </div>
          {isLoggedIn ? null : <div className="btn-register">{Register}</div>}
          {isLoggedIn ? (
            <div className="profile-icon" onClick={profileShow}>
              <img
                src={`data:image/png;base64,${profileImage}`}
                alt="profile"
                className="profile-pic-1"
              />
            </div>
          ) : null}
          <div className={`search bg-trp ${long}`}>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <div className="icon-search hover">
              <Icon.Search className="icon" onClick={searchBar} />
            </div>
            <div className="icon-close">
              <Icon.X className="icon" onClick={closeBar} />
            </div>
          </div>
          <div className="mode bg-trp" onClick={mode}>
            <div
              className={`darkMode hover ${show}`}
              title="dark mode"
              onClick={() => setTheme("light")}
            >
              <Icon.MoonFill className="icon" />
            </div>
            <div
              className={`lightMode hover ${hidden}`}
              title="light mode"
              onClick={() => setTheme("dark")}
            >
              <Icon.Sun className="icon" />
            </div>
          </div>
        </div>
      </header>
      <div className={`profile-box ${p_show}`}>
        <div className="sub-profile-box">
          <div className="user-info">
            <div className="profile-icon-image" onClick={profileShow}>
              <img
                src={`data:image/png;base64,${profileImage}`}
                alt="profile"
                className="profile-pic"
              />
            </div>
            <h3>
              {fname} {lname}
            </h3>
          </div>
          <div className="line-profile-card"></div>
          <div className="box-profile-link">
            <ul>
              <li onClick={Profile}>
                <div className="profile-box-link">Edit Profile </div>
                <div className="profile-box-icon-box">
                  <FaGreaterThan className="profile-box-icons" />
                </div>
              </li>
              <li onClick={Listnings}>
                <div className="profile-box-link">Add Property </div>
                <div className="profile-box-icon-box">
                  <FaGreaterThan className="profile-box-icons" />
                </div>
              </li>
              {email === "admin@gmail.com" ? (
                <li onClick={viewUserDetails}>
                  <div className="profile-box-link">User Details</div>
                  <div className="profile-box-icon-box">
                    <FaGreaterThan className="profile-box-icons" />
                  </div>
                </li>
              ) : (
                <li onClick={viewProperty}>
                  <div className="profile-box-link">View Your Property</div>
                  <div className="profile-box-icon-box">
                    <FaGreaterThan className="profile-box-icons" />
                  </div>
                </li>
              )}
              <li onClick={Logout}>
                <div className="profile-box-link">Logout </div>
                <div className="profile-box-icon-box">
                  <FaGreaterThan className="profile-box-icons" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`sideBar ${hide}`}>
        <div className="sb-menulinks">
          <ul>{sideBar}</ul>
          <div className="btn-sd">{Register}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
