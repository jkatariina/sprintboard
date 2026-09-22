import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import { BoardProvider } from './context/BoardProvider.jsx'
import BoardPage from './pages/BoardPage.jsx'
import ImportPage from './pages/ImportPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import StyleguidePage from './pages/StyleguidePage.jsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <BoardProvider>
        <Header />

        <main className="page">
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/ui" element={<StyleguidePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BoardProvider>
    </BrowserRouter>
  )
}

export default App
