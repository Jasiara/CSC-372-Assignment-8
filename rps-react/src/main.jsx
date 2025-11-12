import { StrictMode } from 'react' // Import React StrictMode for highlighting potential issues
import { createRoot } from 'react-dom/client' // Import the React 18 root creation helper
import './index.css' // Load global styles before rendering
import App from './App.jsx' // Import the root App component

createRoot(document.getElementById('root')).render( // Mount the React tree into the DOM container
  <StrictMode> {/* Wrap the app to surface potential lifecycle issues */}
    <App /> {/* Render the full Rock-Paper-Scissors experience */}
  </StrictMode>,
)
