import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light shadow-sm p-0 bg-body rounded">
        <i className="fa-solid fa-bars border-end  p-3"></i>
        <div className="container-fluid ">
          <Link to="/" className="text-decoration-none">
            <a className="navbar-brand text-uppercase " href="#">
              logo
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="nav-item">
                <a
                  className="nav-link active text-capitalize border-start"
                  aria-current="page"
                >
                  Project Name
                </a>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
