import React from 'react';
import { Container } from 'semantic-ui-react';

export default function LayoutError({ children }) {
    return (
        <div>
            LAYOUT ERROR
            <Container>
                {children}
            </Container>
        </div>
    )
}
