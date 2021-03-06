import { useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    console.log(auth)
    return <Navigate to="/" />
  }
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
        <span  className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
