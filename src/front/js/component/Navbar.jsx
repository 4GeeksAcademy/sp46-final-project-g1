import React from "react";
import { Link } from "react-router-dom";
import logoWoofPetShop from "../../img/logo-pet-shop.jpg"

export const Navbar = () => {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="white">
        <div className="col ms-5">
          <button type="button" className="btn btn-primary">
            <img src={logoWoofPetShop} style={{width: "50px", height: "50px"}} alt="" />
          </button>
        </div>
        <div className="col-4">
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search"/>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <div className="col text-end me-5">
        <button type="button" className="btn btn-primary"><i className="fas fa-lock me-2"></i>Login</button>
        <span className="border-start"></span>
        <button type="button" className="btn btn-primary me-1"><i className="fas fa-heart me-2"></i>Favorites</button>
        <button type="button" className="btn btn-primary"><i className="fas fa-shopping-cart"></i></button>
        </div>
      </nav>
    </div>
  );
};
