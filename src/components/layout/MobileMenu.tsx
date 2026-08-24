import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Conferences', path: '/conferences' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
];

interface MobileMenuProps {
  id?: string;
  open: boolean;
  onNavigate: () => void;
}

export function MobileMenu({ id, open, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          className="az-mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          <nav className="az-container" aria-label="Mobile primary navigation" style={{ paddingBlock: 'var(--az-space-4)' }}>
            <div style={{ display: 'grid', gap: 'var(--az-space-1)', marginBottom: 'var(--az-space-4)' }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'az-mobile-menu__link az-mobile-menu__link--active'
                      : 'az-mobile-menu__link'
                  }
                  onClick={onNavigate}
                  end={link.path === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--az-space-3)', paddingTop: 'var(--az-space-3)', borderTop: '1px solid var(--az-border)' }}>
              <Link
                to="/login"
                className="az-button az-button--ghost az-button--full"
                onClick={onNavigate}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="az-button az-button--primary az-button--full"
                onClick={onNavigate}
              >
                Register
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
