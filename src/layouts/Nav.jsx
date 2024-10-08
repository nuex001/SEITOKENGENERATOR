import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
function Nav() {
  return (
    <nav>
      <a href="/" className="logo">
        <img src="./logo2.png" alt="" />
      </a>
      <ul>
        <li>
          <a href="#">About us</a>
        </li>
        <li className="icons first">
          <a href="#">
            <FaXTwitter />
          </a>
        </li>
        <li className="icons">
          <a href="#">
            <FaTelegramPlane />
          </a>
        </li>
        <li className="icons">
          <a href="#">
            <FaDiscord />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
