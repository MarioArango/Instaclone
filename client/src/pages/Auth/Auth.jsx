import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';
import instaclone from '../../assets/instaclone.png';
import './auth.scss';

export default function Auth() {

    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container fluid className="auth" >
            <Image src={instaclone} />
            <div className="container-form">
                {showLogin? <Login/>:<Register setShowLogin={setShowLogin} />}
            </div>
            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            ¿No tienes cuenta?
                            <span onClick={() => setShowLogin(!showLogin)} >Regístrate</span>
                        </>
                    ) : (
                            <>
                                ¡Entra con tu cuenta!
                                <span onClick={() => setShowLogin(!showLogin)}>Inicia Sesión</span>
                            </>
                        )}
                </p>
            </div>
        </Container>
    )
}
