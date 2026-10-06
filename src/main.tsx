import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/hanken-grotesk'
import './index.css'
import { App } from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered (scripts/prerender.mjs); dev starts empty.
// 404.html is served for every unknown URL (any language), so it is re-rendered, not hydrated.
const isNotFoundShell = document.querySelector('meta[name="robots"][content="noindex"]') !== null
if (container.hasChildNodes() && !isNotFoundShell) hydrateRoot(container, app)
else {
  container.replaceChildren()
  createRoot(container).render(app)
}
