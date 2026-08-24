import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Conferences', path: '/conferences' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/conferences');
  };

  return (
    <header className="az-header" role="banner">
      <div className="az-container az-header__inner">
        <Link className="az-logo" to="/" aria-label="AZTech Home">
          AZ<span>Tech</span>
        </Link>

        <nav className="az-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? 'az-nav__link az-nav__link--active' : 'az-nav__link'
              }
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="az-header__actions">
          <Button
            variant="ghost"
            iconOnly
            aria-label="Search Conferences"
            className="az-header__search"
            onClick={handleSearchClick}
            title="Search Conferences"
          >
            <Search size={19} aria-hidden="true" />
          </Button>
          <Link className="az-button az-button--ghost" to="/login">
            Login
          </Link>
          <Link className="az-button az-button--primary" to="/register">
            Register
          </Link>
          <Button
            variant="ghost"
            iconOnly
            className="az-mobile-trigger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
