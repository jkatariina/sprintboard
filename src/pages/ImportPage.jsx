import { useState } from 'react'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import { validateRepoName } from '../utils/validation.js'
import styles from './ImportPage.module.css'

function ImportPage() {
  const [repo, setRepo] = useState('')
  const [issues, setIssues] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const invalid = validateRepoName(repo)

    if (invalid) {
      setError(invalid)
      setIssues(null)
      return
    }

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
      } else if (response.status === 404) {
        setError('No repository found with that name')
      } else if (response.status === 403) {
        setError(
          "GitHub's hourly limit for anonymous requests is reached. Try again later.",
        )
      } else {
        setError(`Something went wrong (status ${response.status})`)
      }
    } catch {
      setError("Couldn't reach GitHub. Check your connection.")
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
