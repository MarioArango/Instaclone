import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import ImageNoFount from '../../../assets/avatar.png';
import { Icon, Image } from 'semantic-ui-react';
import './rightHeader.scss';

export default function RightHeader() {

    const { auth } = useAuth();
    return (
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                <Icon name="plus"/>
                <Link to={auth.usuario.username}>
                    <Image avatar src={ImageNoFount} />
                </Link>
            </div>
        </>
    )
}
