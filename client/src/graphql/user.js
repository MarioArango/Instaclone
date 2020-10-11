import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation register($user: UserInput!){
        register(user: $user){
            id
            name
            username
            email
            siteWeb
            description
            password
            avatar
            createAt
        }
    }
`;

export const LOGIN = gql`
    mutation login($user: LoginInput!){
        login(user: $user){
            token
        }
    }
`;

export const GET_USER = gql`
    query getUser($username: String!){
        getUser(username:$username){
            name
            username
            email
            siteWeb
            description
            avatar
            createAt
        }
    }
`;