
import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-3 relative">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <NavLink to="/">
              <Logo width="65px" />
            </NavLink>
          </div>

          {/* Right: Nav + Logout */}
          <div className="flex items-center gap-6">
            {/* Hamburger (Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-3xl text-gray-700"
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>

            {/* Nav Links */}
            <ul
              className={`absolute lg:static top-full left-0 w-full lg:w-auto flex flex-col lg:flex-row items-center gap-3 lg:gap-6 bg-white lg:bg-transparent px-6 py-4 lg:p-0 border-t lg:border-0 transition-all duration-300 ease-in-out ${
                menuOpen
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible lg:opacity-100 lg:visible'
              }`}
            >
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'text-gray-800 hover:bg-indigo-100 hover:text-indigo-600'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
