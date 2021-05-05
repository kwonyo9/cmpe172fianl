import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/"></NavLink>
          <NavLink to="/seats"></NavLink>
       </div>
    );
}
 
export default Navigation;