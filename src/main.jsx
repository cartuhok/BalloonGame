import React, { Suspense } from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Loading from "./components/Loading.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
  </React.StrictMode>
)
