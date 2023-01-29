import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'

const LandingPage = () => {
    return (
        <div className={style.LandingPage}>
            <title>Landing Page</title>
            <div className={style.container}>
                <br />
                <h1>Dogs!</h1>
                <br />
                <p>En este proyecto encontraran bastante información sobre razas de perros y sus cualidades.</p>
                <Link to="/home">
                    <button>Entrar</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;