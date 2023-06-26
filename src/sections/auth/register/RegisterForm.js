import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {authService, InvalidCredentialsError} from "../../../api/auth.service";
import {useDispatch} from "react-redux";
import {login} from "../../../app/auth";
import {Formik} from "formik";

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const onChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [field]: value
        }))
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = async () => {
        try {
            const { email, password } = credentials;
            const data = await authService.login(email, password);
            dispatch(login(data));
            navigate('/dashboard', { replace: true });
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                setError('The username or password you entered is incorrect');
            } else {
                setError('Something went wrong, please try again later')
            }
        }
    };

    const handleRegister = () => {
        navigate('/register', { replace: true });
    }

    return (
        <>
            <Formik>
                <form>
                    <Typography sx={{ py: 2, px: 0 }}>Попуните форму за регистрацију:</Typography>
                    <Stack spacing={2} sx={{ p: 0 }}>
                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                            <TextField
                                id="firstname"
                                name="firstname"
                                label="Име"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                            <TextField
                                id="lastname"
                                name="lastname"
                                label="Презиме"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                            <TextField
                                id="jmbg"
                                name="jmbg"
                                label="ЈМБГ"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                            <TextField
                                id="city"
                                name="city"
                                label="Пребивалиште"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                    </Stack>

                    <Typography sx={{ py: 2, px: 0 }}>Идентификациони документ (лична карта или пасош):</Typography>
                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <TextField
                            id="document_type"
                            name="document_type"
                            label="Тип документа"
                            onChange={onChange}
                            sx={{ width: '50%' }}
                        />
                        <TextField
                            id="document_number"
                            name="document_number"
                            label="Број документа"
                            onChange={onChange}
                            sx={{ width: '50%' }}
                        />
                    </Stack>

                    <Typography sx={{ py: 2, px: 0 }}>Корисничко име и лозинка:</Typography>
                    <Stack spacing={2} sx={{ p: 0 }}>
                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                            <TextField
                                id="username"
                                name="username"
                                label="Корисничко име"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="Емаил адреса"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                            <TextField
                                id="password"
                                name="password"
                                label="Лозинка"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                            <TextField
                                id="password_confirm"
                                name="password_confirm"
                                label="Потврда лозинке"
                                onChange={onChange}
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                    </Stack>
                </form>
            </Formik>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2, p: 1 }}>
                <Typography sx={{ color: 'red' }}></Typography>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Регистрација
            </LoadingButton>
        </>
    );
}
