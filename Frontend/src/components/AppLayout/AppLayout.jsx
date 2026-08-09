import { Outlet, useLocation, useNavigation } from 'react-router'
import { useEffect, useState } from 'react'
import Header from '../PageComponents/Header.jsx'
import Navbar from '../PageComponents/Navbar.jsx'
import Footer from '../PageComponents/Footer.jsx'
import Loader from '../../components/loader.jsx'

const AppLayout = () => {
    const location = useLocation();
    const navigation = useNavigation();
    const [isRouteLoading, setIsRouteLoading] = useState(true);

    useEffect(() => {
        setIsRouteLoading(true);
        const timer = window.setTimeout(() => setIsRouteLoading(false), 220);
        return () => window.clearTimeout(timer);
    }, [location.pathname]);

    useEffect(() => {
        if (navigation.state === 'loading') {
            setIsRouteLoading(true);
        }
    }, [navigation.state]);

    if (isRouteLoading || navigation.state === 'loading') return <Loader />;

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
