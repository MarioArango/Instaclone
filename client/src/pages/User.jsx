import React from 'react';
import Profile from '../components/Profile/Profile';
import { useParams } from 'react-router-dom';


export default function User() {

    const {username} = useParams();

    return (
        <div>
            <Profile username={username} />
        </div>
    )
}
