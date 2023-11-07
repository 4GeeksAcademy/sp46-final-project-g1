import React from "react";
import ReactDOM from "react-dom";
import 'bootswatch/dist/minty/bootstrap.min.css';
import "../styles/index.css";  // Include your index.scss file into the bundle
import Layout from "./Layout.jsx";  // Import your own components

// Render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
