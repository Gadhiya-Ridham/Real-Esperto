import { NavLink } from "react-router-dom";

const menuLinks = [
  {
    id: 1,
    title: "Home",
    url: "/",
    cName: "menuLink",
    cName2: "link-sd active",
  },
  {
    id: 2,
    title: "About",
    url: "/About",
    cName: "menuLink",
    cName2: "link-sd",
  },
  {
    id: 3,
    title: "Properties",
    url: "/Properties",
    cName: "menuLink",
    cName2: "link-sd",
  },
  {
    id: 5,
    title: "Contact",
    url: "/Contact",
    cName: "menuLink",
    cName2: "link-sd",
  },
];

const links = [
  {
    id: "btn",
    name: "REGISTER",
    url: "/Login",
    cName: "link-register",
  },
];

export const menuItems = menuLinks.map((item) => (
  <li key={item.id} className="menuItem">
    <NavLink
      exact="true"
      activeclassname="active"
      className={item.cName}
      to={item.url}
    >
      {item.title}
    </NavLink>
  </li>
));

export const sideBar = menuLinks.map((item) => (
  <li key={item.id} className="menu-sd">
    <a href={item.url} className={item.cName2}>
      {item.title}
    </a>
  </li>
));

export const Register = links.map((items) => {
  return (
    <a key={items.id} href={items.url} className={items.cName}>
      {items.name}
    </a>
  );
});
