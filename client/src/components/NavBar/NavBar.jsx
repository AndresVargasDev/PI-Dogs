import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    return (
        <div className={style.container}>
            <img src="/favicon.png" alt="img" />
            <ul>
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/create">
                    <li>Create dog!</li>
                </Link>
                <Link to="/">
                    <li>Exit</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar;