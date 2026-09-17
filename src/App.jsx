import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BoardPage from './pages/BoardPage.jsx'
import ImportPage from './pages/ImportPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/importera" element={<ImportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
