import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Paper, Typography } from '@mui/material';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../Unknown/UIContext';
import HeroImage from '../../../images/Hero-image.jpg';
import SignUpForm from '../../Unknown/SignUpForm';
import { ReactComponent as FlatsLogo } from '../../../images/flats-logo.svg';

const SignUpScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const history = useHistory();

  const handleFormSubmit = React.useCallback(
    async (newUser) => {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);

        await firebase.auth().onAuthStateChanged((user) => {
          user?.updateProfile({ displayName: newUser.name });
        });

        setAlert({
          show: true,
          severity: 'success',
          message: 'Welcome on board 🚀',
        });
      } catch (error) {
        if (error instanceof Error) {
          setAlert({
            show: true,
            severity: 'error',
            message: error.message,
          });
        } else {
          throw error;
        }
      }
    },
    [setAlert],
  );

  const handleRedirect = () => {
    history.push('/login');
  };

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container fixed maxWidth="lg">
          <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={6}
              sx={{
                backgroundImage: `url(${HeroImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light'
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  margin: '20px auto 40px',
                  maxWidth: 375,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ marginBottom: (t) => t.spacing(4) }}>
                  <FlatsLogo />
                </Box>

                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 40,
                    lineHeight: '112.03px',
                    letterSpacing: '-1.5px',
                  }}
                >
                  Register
                </Typography>

                <SignUpForm
                  handleFormSubmit={handleFormSubmit}
                  buttonLabel="Register"
                />
              </Box>

              <Box component="footer" sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    marginBottom: (t) => t.spacing(1),
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '-1.5px',
                  }}
                >
                  Already have account?
                </Typography>

                <Button
                  variant="text"
                  onClick={handleRedirect}
                  sx={{
                    fontWeight: 500,
                    fontSize: 13,
                    letterSpacing: '0.46px',
                    textTransform: 'uppercase',
                    border: '1px solid transparent',
                    ':hover': {
                      border: '1px solid teal',
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignUpScreen;
