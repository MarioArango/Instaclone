import React from 'react';
import { Link } from 'react-router-dom';
import './userNotFound.scss';

export default function UserNotFound({ message }) {
    return (
        <div className="user-not-found">
            <p> {message} </p>
            <p>Es posible que el enlace sea incorrecto o el usuario no exista</p>
            <Link to="/">Volver a las publicaciones</Link>
        </div>
    )
}
