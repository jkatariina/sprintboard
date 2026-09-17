import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function navLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Sprintboard
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <NavLink to="/" end className={navLinkClass}>
            Board
          </NavLink>
          <NavLink to="/importera" className={navLinkClass}>
            Import
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
