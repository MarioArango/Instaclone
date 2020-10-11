import React from 'react';
import Header from '../components/Header/Header';
import { Container } from 'semantic-ui-react';

export default function LayoutBasic({ children }) {
    //children es el hijo dentro del layout en cada navegacion
    return (
        <>
            <Header/>
            <Container className="layout-basic">
                {children}
            </Container>
        </>
    )
};
