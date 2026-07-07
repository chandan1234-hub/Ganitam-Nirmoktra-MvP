import {createBrowserRouter} from 'react-router'
import AppLayout from '../components/AppLayout/AppLayout.jsx'
import Homepage from '../features/Home/Home.page.jsx'
import Aboutpage from '../features/AboutUs/About.page.jsx'
import Contactpage from '../features/Contact/Contact.page.jsx'
import FAQpage from '../features/FAQ/FAQ.page.jsx'
import LetsStartpage from '../features/LetsStart/LetsStart.page.jsx'
import PrivacyPolicypage from '../features/PrivacyPolicy/PrivacyPolicy.page.jsx'
import SubscriptionPage from "../features/Subscription/Subscription.page.jsx";

const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: '/',
                element: <Homepage/>,
            },
            {
                path: '/about',
                element: <Aboutpage/>,
            },
            {
                path: '/contact',
                element: <Contactpage/>,
            },
            {
                path: '/faq',
                element: <FAQpage/>,
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicypage/>,
            },
            {
                path: '/lets-start',
                element: <LetsStartpage/>,
            },
            {
                path: '/SubscriptionPlans',
                element: <SubscriptionPage/>,
            },
        ],
},
])

export default router
