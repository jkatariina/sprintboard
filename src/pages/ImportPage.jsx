import { useState } from 'react'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import styles from './ImportPage.module.css'

function ImportPage() {
  const [repo, setRepo] = useState('')
  const [issues, setIssues] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    setIsLoading(true)
    setError('')
    setIssues(null)

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.trim()}/issues?state=open&per_page=100`,
      )

      if (response.ok) {
        const data = await response.json()

        setIssues(data.filter((item) => !item.pull_request))
      } else {
        setError('Could not load issues from that repository')
      }
    } catch {
      setError('Could not load issues from that repository')
    }

    setIsLoading(false)
  }

  return (
    <div className={styles.page}>
      <h2>Import from GitHub</h2>

      <form className={styles.search} onSubmit={handleSubmit} noValidate>
        <input
          className={styles.input}
          value={repo}
          onChange={(event) => setRepo(event.target.value)}
          placeholder="owner/repo"
          aria-label="Repository"
        />

        <Button type="submit" variant="primary" disabled={isLoading}>
          Search
        </Button>
      </form>

      {isLoading && <Spinner label="Loading issues" />}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {issues && issues.length === 0 && (
        <EmptyState title="No open issues in this repository" />
      )}

      {issues && issues.length > 0 && (
        <ul className={styles.list}>
          {issues.map((issue) => (
            <li key={issue.id} className={styles.issue}>
              <span className={styles.number}>#{issue.number}</span>

              <span className={styles.title}>{issue.title}</span>

              {issue.labels.length > 0 && (
                <Badge variant="accent">{issue.labels[0].name}</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ImportPage
