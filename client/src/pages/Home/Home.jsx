import React from 'react';
import useAuth from '../../hooks/useAuth';

import './home.scss';

export default function Home() {

    const auth = useAuth();

    return (
        <div>
            HOME
        </div>
    )
}
