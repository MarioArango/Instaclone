import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import  * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/user';
import './register.scss';

export default function Register({ setShowLogin }) {

    const [register] = useMutation(REGISTER);

    //Maneja el flujo de datos
    const formik = useFormik({
        initialValues: {
            //Estado de formik
            name: "",
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        },
        //Validaciones con yup
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/).required(true),
            email: Yup.string().email().required(true),
            password: Yup.string().required(true).oneOf([Yup.ref("repeatPassword")]),
            repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")])
        }),
        onSubmit: async (dataForm) => {
            try {
                const newUser = dataForm;
                delete newUser.repeatPassword;
                const { data } = await register({
                    variables: {
                        user: newUser
                    }
                });
                toast.success(`Bienvenido, ${data.register.username}`);
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Regístrate para ver fotos y vídeos de tus amigos.</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombres y apellidos"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                    error={formik.errors.repeatPassword && true}
                />
                <Button primary className="btn-submit">
                    Registrarse
                </Button>
            </Form>
        </>
    )
}
