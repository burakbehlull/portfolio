import React from "react";
import Dark from '../assets/dark.svg'
import Light from '../assets/light.svg'

import {useTheme} from '../context/ThemeContext'

const Navbar : React.FC = ()=>{


    const {theme, setTheme} = useTheme()

    return(
        <nav>
            <ul>
                <li className='tag'>I'm Buvak</li>
                <li><a href="#">Home</a></li>
                <li><a href="#">Contact</a></li>

                <li onClick={()=> setTheme(theme==='light'? 'dark' : 'light')} className="no-invert">
                    {theme==='light' ? <img src={Light} className="no-invert" /> : <img src={Dark} className="no-invert" />}
                </li>
            </ul>
        </nav>
    )
}

export default React.memo(Navbar)

