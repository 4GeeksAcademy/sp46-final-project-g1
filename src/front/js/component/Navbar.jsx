import React from "react";
import { Link } from "react-router-dom";
import logoWoofPetShop from "../../img/logo-pet-shop.jpg"

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-primary">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logoWoofPetShop} style={{ width: "50px", height: "50px" }} alt="" />
          </Link>
        </div>
        <div className="d-none d-xxl-block">
          <div className="ms-5 container d-flex">
            <div className="input-group w-75">
              <input className="form-control me-sm-2 bg-primary-subtle" type="search" placeholder="Buscar" />
              <span className="input-group-btn">
                <button className="btn btn-default text-primary-emphasis" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        {/* Elementos del menu colapsable */}
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/category" className="btn btn-primary me-3 text-primary-emphasis">
                Categorías
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button type="button" className="btn btn-primary rounded text-primary-emphasis dropdown-toggle" data-bs-toggle="dropdown" id="navbarDropdown" aria-expanded="false">
                <i className="fas fa-user me-2"></i>
                Iniciar sesión
              </button>
              <ul className="dropdown-menu bg-primary-subtle">
                <li><Link to="/account" className="dropdown-item text-dark">Mi cuenta</Link></li>
                <li><Link to="/form" className="dropdown-item text-dark">Salir</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link to="/login" className="dropdown-item text-danger">Nuevo cliente? Crear cuenta</Link></li>
              </ul>
              {/* <span className="border-start border-dark"></span> */}
            </li>
            <li className="nav-item">
              <div className="btn-group">
                <button type="button" className="btn btn-primary rounded text-primary-emphasis me-1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-heart me-2"></i>
                  Favoritos
                </button>
                <ul className="dropdown-menu">
                  <li>Action</li>
                  <li>Another action</li>
                  <li>Something else here</li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/shopping-cart" className="btn btn-primary text-primary-emphasis">
                <i className="fas fa-shopping-cart">
                  <span className="badge text-bg-secondary ms-1">0</span>
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    
    // <div className="container-fluid p-0">
    //     <nav className="navbar bg-primary" data-bs-theme="white">
    //       <div className="col-md ms-5">
    //         <Link to="/">
    //           <img src={logoWoofPetShop} style={{ width: "50px", height: "50px" }} alt="" />
    //         </Link>
    //       </div>
    //       <div className="col-md-4 ms-5 d-flex">
    //         <Link to="/category" className="btn btn-primary me-3 text-primary-emphasis">
    //           Categorías
    //         </Link>
    //         <div className="input-group w-75">
    //           <input className="form-control me-sm-2 bg-primary-subtle" type="search" placeholder="Buscar" />
    //           <span className="input-group-btn">
    //             <button className="btn btn-default text-primary-emphasis" type="submit">
    //               <i className="fa fa-search"></i>
    //             </button>
    //           </span>
    //         </div>
    //       </div>
    //       <div className="col-md text-end me-5">
    //         <div className="btn-group">
    //           <button type="button" className="btn btn-primary rounded text-primary-emphasis" data-bs-toggle="dropdown" aria-expanded="false">
    //             <i className="fas fa-user me-2"></i>
    //             Iniciar sesión
    //           </button>
    //           <ul className="dropdown-menu">
    //             <li><Link to="/account" className="dropdown-item text-dark">Mi cuenta</Link></li>
    //             <li><Link to="/form" className="dropdown-item text-dark">Salir</Link></li>
    //             <li><hr className="dropdown-divider" /></li>
    //             <li><Link to="/demo" className="dropdown-item text-danger">Nuevo cliente? Crear cuenta</Link></li>
    //           </ul>
    //         </div>
    //         <span className="border-start border-dark"></span>
    //         <div className="btn-group">
    //           <button type="button" className="btn btn-primary rounded text-primary-emphasis me-1" data-bs-toggle="dropdown" aria-expanded="false">
    //             <i className="fas fa-heart me-2"></i>
    //             Favoritos
    //           </button>
    //           <ul className="dropdown-menu">
    //             <li>Action</li>
    //             <li>Another action</li>
    //             <li>Something else here</li>
    //           </ul>
    //         </div>
    //         <Link to="/shopping-cart" className="btn btn-primary text-primary-emphasis">
    //           <i className="fas fa-shopping-cart">
    //             <span className="badge text-bg-secondary ms-1">0</span>
    //           </i>
    //         </Link>
    //       </div>
    //     </nav>
    //   </div>
  );
};
