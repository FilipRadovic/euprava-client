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

// ----------------------------------------------------------------------

export default function LoginForm() {
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
          localStorage.setItem('auth', JSON.stringify(data));
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
      <Stack spacing={3}>
            <TextField
                name="email"
                label="Адреса електронске поште"
                onChange={onChange}
            />
            <TextField
                name="password"
                label="Ваша лозинка"
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2, p: 1 }}>
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
        <Button color="grey" fullWidth size="large" type="submit" variant="contained" onClick={handleRegister} sx={{marginTop: "10px"}}>
            Register
        </Button>
    </>
  );
}
