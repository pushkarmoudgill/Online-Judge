import React from 'react';

import {Link} from 'react-router-dom'
const Nav=()=>{
    return (
        <div className="bg-slate-500">
            <ul>
            <li><Link to="/">Problems</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
                
                
            </ul>
        </div>
    )
}

export default Nav;
