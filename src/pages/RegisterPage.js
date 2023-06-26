import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {Link, Container, Typography, Divider, Stack, Button, Box} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    },
    overflowY: 'hidden'
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
    const mdUp = useResponsive('up', 'md');

    return (
        <>
            <Helmet>
                <title> Register | Minimal UI </title>
            </Helmet>

            <StyledRoot>
                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ p: 3 }}>
                            euprava.gov.rs
                        </Typography>
                        <Typography variant="h4">
                            Добро дошли
                        </Typography>
                        <Typography variant="subtitle2" sx={{ p: 3, px: 5, textAlign: 'center' }}>
                            У пар корака до свих информација и електронских услуга у Републици Србији.
                        </Typography>
                        <img src="https://euprava.gov.rs/TheEGovernmentTheme/img/logo.svg" alt="login" style={{ width: '75%', aspectRatio: '1/1' }} />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Портал за електронску идентификацију
                            </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Пријава корисничким именом и лозинком је пријава основног нивоа поузданости.
                        </Typography>

                        <LoginForm />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
