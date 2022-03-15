import React from "react";
import "./NotFoundPage.css";
import notFoundImage from "images/404.png";
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className='not-found'>
            <img src={notFoundImage} alt="pokeball" />
            <div className='message'>
                <h2> Uh-oh! </h2>
                <p> You look lost on your journey! </p>
                <Link to='/' className='go-back-button'> Go Back Home </Link>
            </div>
        </div>
    );
}
