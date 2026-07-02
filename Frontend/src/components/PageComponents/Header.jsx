import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return (
        <div className="flex justify-around items-center px-4 py-4">
            {/*BrandLogo*/}
            <div>
                {/*<img src="" alt="">*/}
                {/*    <a href=""></a>*/}
                {/*</img>*/}
            </div>
            <Navbar/>
            {/*signIn & SignUp button*/}
            <div>
            </div>
        </div>
    )
}

export default Header