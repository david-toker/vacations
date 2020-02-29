import React from 'react';
import './navigation-items.css';
import NavigationItem from './navigation-item/navigation-item';

const NavigationItems = ( props ) => (
    <ul className="NavigationItems">
        { !props.isAuthenticated 
            ? <NavigationItem link="/" exact>Vacations</NavigationItem> 
            : <NavigationItem link="/collection">My Vacations</NavigationItem>}


        {(props.isAuthenticated && !props.isAdmin) ? <NavigationItem link="/my-favorite-list">Favorites</NavigationItem> : null}
        {(props.isAuthenticated && props.isAdmin) ? <NavigationItem link="/follow-statistics">Live Reports</NavigationItem> : null}
        { !props.isAuthenticated 
            ? <NavigationItem link="/auth">Login</NavigationItem> 
            : <NavigationItem link="/signout">Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;