import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import {RecommendationProvider} from "./store/store";

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RecommendationProvider>
    <App  />
      </RecommendationProvider>
 
  </StrictMode>,
)
