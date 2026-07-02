import { Outlet } from 'react-router'
import Header from '../PageComponents/Header.jsx'
import Navbar from '../PageComponents/Navbar.jsx'
import Footer from '../PageComponents/Footer.jsx'

const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
