import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="topnav">
      <div className="hamandlogo">
        <div
          className={`hamburger ${active ? "change" : ""}`}
          onClick={handleClick}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <NavLink to="/" className="logopic" onClick={() => setActive(false)}>
          <img src="https://res.cloudinary.com/headincloud/image/upload/v1595455957/betrippinlogo.png" />
        </NavLink>
      </div>

      <nav className={`nav ${active ? "shownav" : "hidenav"}`}>
        <NavLink to="/" onClick={() => setActive(!active)}>
          Trips
        </NavLink>
        <NavLink to="/team" onClick={() => setActive(!active)}>
          Team
        </NavLink>
        <NavLink to="/about" onClick={() => setActive(!active)}>
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Nav;
