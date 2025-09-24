import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCart2, BsHeart } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    localStorage.setItem("validatn", JSON.stringify({ isLoggin: false }));
  };

  return (
    <header>
      <nav>
        <h2 className="nav-brand">
          <span>Fabric</span> City
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
    </header>
  );
}

export default Header;
