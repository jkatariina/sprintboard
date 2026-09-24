import { useState } from 'react'
import { MotionConfig } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Splash from './components/layout/Splash.jsx'
import { BoardProvider } from './context/BoardProvider.jsx'
import { useTheme } from './hooks/useTheme.js'
import BoardPage from './pages/BoardPage.jsx'
import ImportPage from './pages/ImportPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import StyleguidePage from './pages/StyleguidePage.jsx'

function App() {
  const [isReady, setIsReady] = useState(false)
  const [theme, setTheme] = useTheme()

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <BoardProvider>
          <Splash onDone={() => setIsReady(true)} />

          {isReady && (
            <>
              <Header theme={theme} setTheme={setTheme} />

              <main className="page">
                <Routes>
                  <Route path="/" element={<BoardPage />} />
                  <Route path="/import" element={<ImportPage />} />
                  <Route path="/ui" element={<StyleguidePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </>
          )}
        </BoardProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
