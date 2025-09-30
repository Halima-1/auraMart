import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCart, BsCart2, BsHeart, BsMenuApp, BsMenuDown, BsTools } from "react-icons/bs";
import { BiAccessibility, BiCarousel, BiCloset, BiHome, BiLogOut, BiMenu, BiSolidContact } from "react-icons/bi";
import { useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [menu, setMenu] =useState(false)
  const toggleSideBar =() =>{
    setMenu(!menu)

  }
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    localStorage.setItem("validatn", JSON.stringify({ isLoggin: false }));
  };
  return (
    <>
    {window.innerWidth >= 768? <> <header>
      <nav>
        <h2 className="nav-brand">
        AuraMart
        </h2>
        <ul>
          <li>
            <NavLink
              className={"nav-item"}
              to={"/"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={"nav-item"}
              to={"/productPage"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              className={"nav-item"}
              to={"/contact"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/cart"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              <BsCart2 className={"nav-item nav-icon"} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/wishlist"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              <BsHeart className={"nav-item nav-icon"} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/login"}
              style={({ isActive }) =>
                isActive ? { color: "red", marginTop: 20 } : { marginTop: 20 }
              }
            >
              <BiLogOut
                onClick={() => logout()}
                className={"nav-item nav-icon"}
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header></>: <> <aside>
    <nav>
      <div>
        {menu? <BiCarousel className="menu-icon"
         onClick={toggleSideBar}
         style={ {marginLeft:120}}
         />:
        <BiMenu className="menu-icon" 
        onClick={toggleSideBar}
        style={menu? {marginLeft:'50px'}: null}
        />
        }
         <li>
            <NavLink className={"mobile-cart"}
              to={"/cart"}
            >
            <BsCart2 className={"menu-icon"} />
            </NavLink>
          </li>
      </div>
      <ul style={menu? {display:"block"}: {display:"none"}}>
      <li>
      <BiHome className="aside-icon aside-item"/>
            <NavLink
              className={"aside-item"}
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
          <BiAccessibility className=" aside-item aside-icon"/>
            <NavLink
              className={"aside-item"}
              to={"/productPage"}
            >
              Products
            </NavLink>
          </li>
          <li>
          <BsCart2 className={"aside-item nav-icon aside-icon"} />
            <NavLink className={"aside-item"}
              to={"/cart"}
            >
              Cart
            </NavLink>
          </li>
          <li>
          <BsHeart className={"aside-item nav-icon aside-icon"} />
            <NavLink
            className={"aside-item"}
              to={"/wishlist"}
            >
              Wishlist
            </NavLink>
          </li>
          <li>
          <BiSolidContact className="aside-item aside-icon"/>
            <NavLink
              className={"aside-item"}
              to={"/contact"}
            >
              Contact
            </NavLink>
          </li>
          <li>
          <BiLogOut
                onClick={() => logout()}
                className={"aside-item nav-icon aside-icon"}
              />
            <NavLink
            className={"aside-item"}
              to={"/login"}
            >
             Logout
            </NavLink>
          </li>
      </ul>
    </nav>
    </aside> </>
    }
    </>
     );
}

export default Header;
