import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup); // extend yup

const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    jmbg: '',
    city: '',
    document_type: '',
    document_number: '',
    username: '',
    password: '',
    password_confirm: ''
}

const schema = Yup.object().shape({
    firstname: Yup.string().required().min(2).max(30),
    lastname: Yup.string().required().min(2).max(30),
    email: Yup.string().required().email(),
    jmbg: Yup.string().required().length(13).matches(new RegExp('[0-9]{13}')),
    city: Yup.string().required(),
    document_type: Yup.string().required(),
    document_number: Yup.string().required(),
    username: Yup.string().required().min(2).max(30),
    password: Yup.string().required().password(),
    password_confirm: Yup.string().required().oneOf([Yup.ref('password')])
})

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
                isInitialValid={false}
            >
                {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid ,
                        isSubmitting,
                        /* and other goodies */
                    }) => {
                    return <>
                        <Typography sx={{ py: 2, px: 0 }}>Попуните форму за регистрацију:</Typography>
                        <Stack spacing={2} sx={{ p: 0 }}>
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    label="Име"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstname}
                                    sx={{ width: '50%' }}
                                    error={touched.firstname && errors.firstname}
                                />
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    label="Презиме"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastname}
                                    sx={{ width: '50%' }}
                                    error={touched.lastname && errors.lastname}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                                <TextField
                                    id="jmbg"
                                    name="jmbg"
                                    label="ЈМБГ"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.jmbg}
                                    sx={{ width: '50%' }}
                                    error={touched.jmbg && errors.jmbg}
                                />
                                <TextField
                                    id="city"
                                    name="city"
                                    label="Пребивалиште"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    sx={{ width: '50%' }}
                                    error={touched.city && errors.city}
                                />
                            </Stack>
                        </Stack>

                        <Typography sx={{ py: 2, px: 0 }}>Идентификациони документ (лична карта или пасош):</Typography>
                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                            <TextField
                                id="document_type"
                                name="document_type"
                                label="Тип документа"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.document_type}
                                sx={{ width: '50%' }}
                                error={touched.document_type && errors.document_type}
                            />
                            <TextField
                                id="document_number"
                                name="document_number"
                                label="Број документа"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.document_number}
                                sx={{ width: '50%' }}
                                error={touched.document_number && errors.document_number}
                            />
                        </Stack>

                        <Typography sx={{ py: 2, px: 0 }}>Корисничко име и лозинка:</Typography>
                        <Stack spacing={2} sx={{ p: 0 }}>
                            <TextField
                                id="username"
                                name="username"
                                label="Корисничко име"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                sx={{ width: '100%' }}
                                error={touched.username && errors.username}
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="Емаил адреса"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ width: '100%' }}
                                value={values.email}
                                error={touched.email && errors.email}
                            />
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Лозинка"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ width: '50%' }}
                                    value={values.password}
                                    type="password"
                                    error={touched.password && errors.password}
                                />
                                <TextField
                                    id="password_confirm"
                                    name="password_confirm"
                                    label="Потврда лозинке"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ width: '50%' }}
                                    value={values.password_confirm}
                                    type="password"
                                    error={touched.password_confirm && errors.password_confirm}
                                />
                            </Stack>
                            <Typography variant="body2" sx={{ mb: 5 }}>
                                Упишите лозинку која ће садржати најмање осам карактера, бар једно велико и мало слово, број и специјални карактер
                            </Typography>

                            <LoadingButton onClick={handleSubmit} disabled={!isValid || isSubmitting} sx={{ marginTop: '20px' }} fullWidth size="large" type="submit" variant="contained">
                                Регистрација
                            </LoadingButton>
                        </Stack>
                    </>
                }
                }
            </Formik>
        </>
    );
}
