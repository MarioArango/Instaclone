import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/user'
import { setToken, decodeToken } from '../../util/token';
import useAuth from '../../hooks/useAuth';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.scss';

export default function Login() {

    const [error, setError] = useState("");

    //Devuelve el nombre de la queryvariable "login"
    const [ login ] = useMutation(LOGIN);

    const { setUser } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(true),
            password: Yup.string().required(true)
        }),
        onSubmit: async (dataForm) => {
            try {
                setError("");                   
                const { data } = await login({
                    variables: {
                        user: dataForm
                    }
                });
                const { token } = data.login;
                setToken(token);
                setUser(decodeToken(token));
            } catch (error) {
                setError(error.message);
            }
        }
    });

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Entra para ver fotos y vídeos de tus amigos.</h2>
            <Form.Input
                type="text"
                placeholder="Correo electrónico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}
            />
            <Form.Input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password && true}
            />
            <Button primary type="submit" className="btn-submit">
                Iniciar sesión
            </Button>
            { error && <p className="submit-error" > {error} </p> }
        </Form>
    )
}
