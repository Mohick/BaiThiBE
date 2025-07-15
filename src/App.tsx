
import { useEffect } from 'react'
import './App.css'
import RoutesPage from './Routes/Routes Page'

function App() {

  useEffect(() => {
    document.title = "Oki Chat";
    alert(" Chào mừng đến với chat App")
  }, [])

  return (
    <>
      <RoutesPage />
    </>
  )
}

export default App
