import { Outlet } from 'react-router-dom'
import './App.css'
import NavBarReact from './Components/NavBar/NavBar'
import Footer from './Components/Home/Footer'
// import { NavbarReact } from './Components/NavBar/NavBar'

function App() {


  return (<>
    <NavBarReact/>
    <Outlet/>
    <Footer/>
  </>
  )
}

export default App
