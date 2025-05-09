import {createBrowserRouter} from 'react-router'

import App from '../App'
import Events from '../page/Events'
import Signup from '../page/SignUp'
import SignIn from '../page/SignIn'
import ForgotPassword from '../page/ForgotPassword'
import OTPVerification from '../page/OTPVerification'
export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
    },
    {
        path: '/event',
        Component: Events,
    },
    {
        path: '/signup', 
        Component: Signup
    },
    {
        path: '/signin',
        Component: SignIn
    },
    {
        path: '/forgot-password',
        Component: ForgotPassword
    },{
        path: '/verify-otp',
        Component: OTPVerification
    }

    
])