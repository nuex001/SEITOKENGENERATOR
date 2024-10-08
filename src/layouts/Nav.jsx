import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { LiaDonateSolid } from "react-icons/lia";
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
          <a target="_blank"  href="https://twitter.com/nuelyoungtech">
            <FaXTwitter />
          </a>
        </li>
        <li className="icons">
          <a href="#">
            <FaTelegramPlane />
          </a>
        </li>
        <li className="icons">
          <a target="_blank" href="https://explorer.gitcoin.co/#/round/1329/11/79">
            <LiaDonateSolid />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
