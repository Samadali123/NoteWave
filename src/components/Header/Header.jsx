// import React from 'react'
// import {Container, Logo, LogoutBtn} from '../index'
// import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status)
//   const navigate = useNavigate()

//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//   ]


//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='70px'   />

//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

// export default Header


import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="bg-[#e5e7eb] shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-3 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo width="70px" />
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Nav Items */}
          <ul
            className={`flex flex-col lg:flex-row absolute lg:static top-[100%] left-0 w-full lg:w-auto bg-[#e5e7eb] lg:bg-transparent z-20 transition-all duration-300 ease-in-out ${
              menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'
            }`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="mx-4 my-2 lg:my-0">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(item.slug);
                      }}
                      className="text-gray-800 hover:text-[#4F46E5] px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="mx-4 my-2 lg:my-0">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
