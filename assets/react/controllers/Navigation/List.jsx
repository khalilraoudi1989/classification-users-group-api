// Navigation.jsx
import React from 'react';
import { Link} from 'react-router-dom';

const Navbar= () =>{
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                <li className="nav-item">
                    <Link to="/users" className="nav-link text-white">User</Link>
                </li>
                <li className="nav-item">
                    <Link to="/groups" className="nav-link text-white">Group</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>

  );
}
export default Navbar;
