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
              <li><a className="dropdown-item" href="#">Food</a></li>
              <li><a className="dropdown-item" href="#">Toys</a></li>
              <li><a className="dropdown-item" href="#">Accessories</a></li>
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
              <li><a className="dropdown-item" href="#">Accout</a></li>
              <li><a className="dropdown-item" href="#">Orders</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">New customer? <Link to="/demo">Start here</Link></a></li>
            </ul>
          </div>
          <span className="border-start border-dark"></span>
          <div className="btn-group">
            <button type="button" className="btn btn-primary rounded text-primary-emphasis me-1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-heart me-2"></i>
              Favorites
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
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
