import React from 'react';

import {Link} from 'react-router-dom'
const Nav=()=>{
    return (
        <div className="">
            <ul>
            <li><Link to="/">Problems</Link></li>
                <li class="ml-10"><Link to="/signup">Sign up</Link></li>
                <li><Link to="/compiler">Compiler</Link></li>
                
            </ul>
        </div>
    )
}

export default Nav;
