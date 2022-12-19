import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <nav class="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <p>Pokémon to Scale</p>
          </li>
          <li class="nav-item">
            <a href="https://github.com/TheVanadium/pokemon-to-scale" id="icon-target">Github</a>
          </li>
          <li class="nav-item">
            <a href="https://thevanadium.github.io/portfolio/" id="icon-target">by Garret Castro</a>
          </li>
        </ul>
      </nav>
    )
}

export default Header;