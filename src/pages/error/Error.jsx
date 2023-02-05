import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

export default function Error() {
    document.title = "404 PAGE NOT FOUND"
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>No parkings around here!</p>
      <span><Link to={"/"}>Go back to Homepage</Link></span>
    </div>
  );
}
