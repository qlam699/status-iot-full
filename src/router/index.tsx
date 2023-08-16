import App from 'App'
import { createBrowserRouter } from 'react-router-dom'

export default createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/hi',
    element: <div>hihi</div>
  }
])
