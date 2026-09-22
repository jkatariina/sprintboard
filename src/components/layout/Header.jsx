import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './Header.module.css'

function navLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

function Header() {
  const { query, setQuery } = useBoard()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <img src={logo} alt="" className={styles.logo} />
          Sprintboard
        </Link>

        <input
          className={styles.search}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search cards"
          aria-label="Search cards"
        />

        <nav className={styles.nav} aria-label="Main">
          <NavLink to="/import" className={navLinkClass}>
            Import
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
