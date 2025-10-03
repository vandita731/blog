import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button'; // <-- import your reusable Button

function Header() { 
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth?.status) || false;

  const navItems = [ 
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-post", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Your Posts", slug: "/your-posts", active: authStatus }, // new page
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Logo width="70px" />
            </Link>
            <span className="text-white font-bold text-lg">Vibeboard</span>
          </div>

          {/* Nav Items */}
          <ul className="flex items-center space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <Button
                      bgColor="bg-white/20"
                      textColor="text-white"
                      className="hover:bg-white hover:text-indigo-600"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </Button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
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
