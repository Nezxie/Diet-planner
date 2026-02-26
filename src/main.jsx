import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from "react-router";
import './styles/index.css'
import App from './App.jsx'
import RecipePage from './RecipePage.jsx'
import RecipeListPage from './RecipeListPage.jsx'
import PreferencesPage from './PreferencesPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipe-list" element={<RecipeListPage />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
