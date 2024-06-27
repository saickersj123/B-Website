import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav id="nav">
      <ul>
        <li><Link to="/" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Main</Link></li>
        <li>
          <a href="#" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>about us</a>
          <ul>
            <li><Link to="/members">동아리부원 소개</Link></li>
            <li><Link to="/members#meeting-place">모임장소</Link></li>
            <li><Link to="/members#our-goal">우리들의 목표</Link></li>
          </ul>
        </li>
        <li><Link to="/project-page" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Project</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
