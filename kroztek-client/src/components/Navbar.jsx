/** @format */

import "../css/Navbar.css";

import React, { useState, useEffect } from "react";
import {
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown"
import FormDropdown from "./FormDropdown";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const menusLoggedIn = [

    {
      path: "/services",
      name: "Services",
    }
  ];
const renderMenusInLargeScreen = () => {
 return menusLoggedIn.map((item) => (
        <div className={"menu-item"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
  };
  const renderMenusInSmallScreen = () => {

      return menusLoggedIn.map((item) => (
        <div className={"menu-item-vertical"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
   
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to={"/"}>
          <div className="logo">KROZTEK INTEGRATED SOLUTION</div>
        </Link>

        {isSmallScreen ? (
          <div className="menu-icon" onClick={toggleMenu}>
            {menuVisible ? (
              <CloseOutlined className="icon" />
            ) : (
              <MenuOutlined className="icon" />
            )}
          </div>
        ) : (
          <nav className="menu">
            {/* <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                onChange={(e) => handleSearch(e)}
              />
              <SearchOutlined className="search-icon" />
            </div> */}

            <div className="menu-items">
            <div className="menu-item">
                <CategoryDropdown />
            </div>
              {renderMenusInLargeScreen()}
              <div className="menu-item">
                <FormDropdown />
            </div>
            </div>
          </nav>
        )}
      </div>
      {menuVisible && isSmallScreen && (
        <nav className="mobile-menu">
          <div className="menu-items-vertical">
          <div className="menu-item">
                <CategoryDropdown />
              </div>
            {renderMenusInSmallScreen()}
            <div className="menu-item">
                <FormDropdown />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
