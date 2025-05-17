import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GlobalState  from './components/functional/context.jsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './components/functional/routes.jsx'

createRoot(document.getElementById('root')).render(
    <GlobalState>
      <RouterProvider router={routes} />
    </GlobalState>
)
