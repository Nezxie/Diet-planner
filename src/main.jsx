import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route  } from "react-router";
import './styles/index.css'
import App from './App.jsx'
import RecipePage from './RecipePage.jsx'
import RecipeListPage from './RecipeListPage.jsx'
import PreferencesPage from './PreferencesPage.jsx'
import Test from './Drag_and_Drop/test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipe-list" element={<RecipeListPage />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
