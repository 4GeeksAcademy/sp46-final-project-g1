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
          <button type="button" className="btn btn-primary text-primary-emphasis"><i className="fas fa-lock me-2"></i>Login</button>
          <span className="border-start border-dark"></span>
          <button type="button" className="btn btn-primary me-1 text-primary-emphasis"><i className="fas fa-heart me-2"></i>Favorites</button>
          <button type="button" className="btn btn-primary text-primary-emphasis"><i className="fas fa-shopping-cart"></i></button>
        </div>
      </nav>
    </div>
  );
};
