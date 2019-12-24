import React from 'react'
import classes from './sidenav.module.css'


const sidenav = (props) => {
    return (
        <div className={classes.sideNav}>
            {props.children}
        </div>
    )
}

export default sidenav;