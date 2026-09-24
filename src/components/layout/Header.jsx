import { Link, NavLink } from 'react-router-dom'
import logoDark from '../../assets/logo-dark.svg'
import logoLight from '../../assets/logo-light.svg'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './Header.module.css'

function navLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

function Header({ theme, setTheme }) {
  const { query, setQuery } = useBoard()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <img
            src={theme === 'dark' ? logoDark : logoLight}
            alt=""
            className={styles.logo}
          />
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

        <button
          type="button"
          className={`${styles.theme} ${theme === 'dark' ? styles.themeOn : ''}`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label="Dark mode"
        >
          <span className={styles.knob} />
        </button>

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
