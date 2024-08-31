import { Outlet } from 'react-router-dom'
import './App.css'
import NavBarReact from './Components/NavBar/NavBar'
// import { NavbarReact } from './Components/NavBar/NavBar'

function App() {


  return (<>
    <NavBarReact/>
    <Outlet/>
  </>
  )
}

export default App
