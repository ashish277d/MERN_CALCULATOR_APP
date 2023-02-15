import { useState } from "react";
import { Link } from "react-router-dom";
import LoginContext from '../context/LoginContext';

const Title =()=> (
    <a href="/">
    <img
    className = "h-28 p-2"
    alt="logo"
    src="https://obs.line-scdn.net/0m0339dd5b72513e8a8d6127b836e5ecf1e128f1da5cb7"
    />
    </a>
    )

    const Header =() =>{
        const [isLoggedIn,setIsLoggedIn]=useState(false);
        return (
        <div className = "flex justify-between bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50" >
            <Title />
          <div className="nav-items">
            <ul className="flex py-10">
            <Link to="/">
              <li className="px-2">Home</li>
              </Link>
              <Link to="/record">
              <li className="px-2">Records</li>
              </Link>
              <Link to="/operation">
              <li className="px-2">Add Operation</li>
              </Link>
              <Link to="/login">
              { LoginContext.isLoggedIn ? (
            <li onClick={() => setIsLoggedIn(false)}>Logout</li>
                 ):(<li onClick={() => setIsLoggedIn(true)}>Login</li>)} 
              </Link>
            </ul>
          </div>
          {/* { isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          ):(<button onClick={() => setIsLoggedIn(true)}>Login</button>)} */}
          </div>);
      }
export default Header;