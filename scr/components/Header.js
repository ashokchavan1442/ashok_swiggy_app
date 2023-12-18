import {LOGO_URL} from "../utils/contants"
import { Link } from "react-router-dom";
import { useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  const [btnNameReact,setBtnReact] = useState('Login');
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between bg-pink-100 shadow-lg">
      <div className="w-20">
        <img
          className="p-4"
          src={LOGO_URL}
        />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4"> online status:{onlineStatus ? "💚" : "❤"}</li>
          <li className="px-4"><Link to="/grocery">Grocery</Link></li>

          <li className="px-4"><Link to="/">Home</Link></li>
          <li className="px-4"><Link to="/about">About us</Link></li>
          <li className="px-4"><Link to="/contact">Contact Us</Link></li>
          <li className="px-4">Cart</li>
          <button className="login-button" onClick={()=>{
            btnNameReact==='Login'?setBtnReact("Logout"):setBtnReact("Login");
          }}>{btnNameReact}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;