import { createBrowserRouter } from 'react-router'
import { lazy } from 'react'
const AppLayout = lazy(() => import('../components/AppLayout/AppLayout.jsx'))
const Homepage = lazy(() => import('../features/Home/Home.page.jsx'))
const Aboutpage = lazy(() => import('../features/AboutUs/About.page.jsx'))
const Contactpage = lazy(() => import('../features/Contact/Contact.page.jsx'))
const FAQpage = lazy(() => import('../features/FAQ/FAQ.page.jsx'))
const LetsStartpage = lazy(() => import('../features/LetsStart/LetsStart.page.jsx'))
const PrivacyPolicypage = lazy(() => import('../features/PrivacyPolicy/PrivacyPolicy.page.jsx'))
const SubscriptionPage = lazy(() => import("../features/Subscription/Subscription.page.jsx"))
const ThankyouPage = lazy(() => import("../features/ThankyouPage/ThankyouPage.jsx"))
const PageNotFound = lazy(() => import('../features/ErrorPage/PageNotFound.jsx'))

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/about',
                element: <Aboutpage />,
            },
            {
                path: '/contact',
                element: <Contactpage />,
            },
            {
                path: '/faq',
                element: <FAQpage />,
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicypage />,
            },
            {
                path: '/SubscriptionPlans',
                element: <SubscriptionPage />,
            },
        ],
    },
    {
        path: '/lets-start',
        element: <LetsStartpage />,
  },
  {
      path: '/thankyou',
      element: <ThankyouPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  }
])

export default router;
