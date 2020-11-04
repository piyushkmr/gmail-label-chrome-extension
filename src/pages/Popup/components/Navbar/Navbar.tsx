import React from 'react';
import logo from 'assets/img/label-icon.png';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        Gmail Labels
      </a>
    </nav>
  );
};
