import React from 'react';
import './styles/Navbar.css';
import Products from './Products';
import Posts from './Posts';
import Recipes from './Recipes';

function Navbar({ setPage }) {
  return (
    <nav className='navbar'>
      <ul>
        <li><a href="#" className="nav-link" onClick={() => setPage(<Products setPage={setPage} />)}>Products</a></li>
        <li><a href="#" className="nav-link" onClick={() => setPage(<Posts setPage={setPage} />)}>Posts</a></li>
        <li><a href="#" className="nav-link" onClick={() => setPage(<Recipes setPage={setPage} />)}>Recipes</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
