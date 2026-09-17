import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>There is nothing at this address.</p>
      <Link to="/">Back to the board</Link>
    </section>
  )
}

export default NotFoundPage
