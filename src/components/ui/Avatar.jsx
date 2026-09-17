import styles from './Avatar.module.css'

function initials(name) {
  const words = name.trim().split(' ')

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return (words[0][0] + words[1][0]).toUpperCase()
}

function Avatar({ name }) {
  return (
    <span className={styles.avatar} title={name}>
      {initials(name)}
    </span>
  )
}

export default Avatar
