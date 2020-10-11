import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/user';
import ModalBasic from '../../components/ModalBasic/ModalBasic';
import AvatarForm from '../../components/User/AvatarForm/AvatarForm';
import UserNotFound from '../UserNotFound/UserNotFound';
import ImageNoFound from '../../assets/avatar.png'
import { Grid, Image, Modal } from 'semantic-ui-react';
import './profile.scss';

export default function Profile({ username }) {

    const [showModal, setShowModal] = useState(false);

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {username}
    });

    if (error) return <UserNotFound message={error.message}/>
    
    if(loading) return <h1>Loading...</h1>
    return (
        <>
            <Grid className="profile">
                <Grid.Column width="5" className="profile__left">
                    <Image avatar src={ImageNoFound} onClick={() => setShowModal(true)}/>
                </Grid.Column>
                <Grid.Column width="11" className="profile__right">
                    <div>HEADER PROFILE</div>
                    <div>FOLLOWERS</div>
                    <div className="other">
                        <p className="name"> {data.getUser.name} </p>
                        {data.getUser.siteWeb && (
                            <a href={data.getUser.siteWeb} className="siteWeb" target="_blank">
                                {data.getUser.siteWeb}
                            </a>
                        )}
                        {data.getUser.description && (
                            <p className="description"> {data.getUser.description} </p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title="subir avatar">
                <AvatarForm/>
            </ModalBasic>
        </>
    )
};
