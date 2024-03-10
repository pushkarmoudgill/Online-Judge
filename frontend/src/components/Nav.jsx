import React from 'react';

import {Link} from 'react-router-dom'
const Nav=()=>{
    return (
        <div >
            <ul className="Nav">
            <li class="font-bold"><Link to="/">Home</Link></li>
            <li class="font-bold"><Link to="/problems">Problems</Link></li>
                <li class="ml-10 font-bold"><Link to="/signup">Sign up</Link></li>
                
                <li class="font-bold"><Link to="/login">Login</Link></li>
                <li class="font-bold"><Link to="/addProblem">Add Problem</Link></li>
            </ul>
        </div>
    )
}

export default Nav;
