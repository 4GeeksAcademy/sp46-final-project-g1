import React from "react";
import { Link } from "react-router-dom";
import logoWoofPetShop from "../../img/logo-pet-shop.jpg"

export const Navbar = () => {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="white">
        <div className="col ms-5">
          <Link to="/">
            <img src={logoWoofPetShop} style={{ width: "50px", height: "50px" }} alt="" />
          </Link>
        </div>
        <div className="col-4 ms-5 d-flex">
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle me-3 text-primary-emphasis" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </button>
            <ul className="dropdown-menu">
              <li>Food</li>
              <li>Toys</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div className="input-group w-75">
            <input className="form-control me-sm-2 bg-primary-subtle" type="search" placeholder="Search" />
            <span className="input-group-btn">
              <button className="btn btn-default text-primary-emphasis" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="col text-end me-5">
          <div className="btn-group">
            <button type="button" className="btn btn-primary rounded text-primary-emphasis" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user me-2"></i>
              Login
            </button>
            <ul className="dropdown-menu">
              <li>Accout</li>
              <li>Orders</li>
              <li><hr className="dropdown-divider" /></li>
              <li>New customer? <Link to="/demo">Start here</Link></li>
            </ul>
          </div>
          <span className="border-start border-dark"></span>
          <div className="btn-group">
            <button type="button" className="btn btn-primary rounded text-primary-emphasis me-1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-heart me-2"></i>
              Favorites
            </button>
            <ul className="dropdown-menu">
              <li>Action</li>
              <li>Another action</li>
              <li>Something else here</li>
            </ul>
          </div>
          <button type="button" className="btn btn-primary text-primary-emphasis">
            <i className="fas fa-shopping-cart">
              <span className="badge text-bg-secondary ms-1">0</span>
            </i>
          </button>
        </div>
      </nav>
    </div>
  );
};
