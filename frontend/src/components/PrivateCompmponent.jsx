import React from 'react';
import {Navigate,Outlet} from 'react-router-dom';

const PrivateComponent=()=>{
    return <Outlet/>
}


export default PrivateComponent;