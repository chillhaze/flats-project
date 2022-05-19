import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from 'reactfire';
import firebase from 'firebase/app';
import { Box } from '@mui/system';
import AuthenticatedLayout from '../AuthenticatedLayout';
import GuestLayout from '../GuestLayout';
import HomeScreen from '../HomeScreen';
import NotFoundScreen from '../NotFoundScreen';
import SignInScreen from '../../Auth/SignInScreen';
import SignUpScreen from '../../Auth/SignUpScreen';
import FlatsScreen from '../FlatsScreen';
import Header from '../Header';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';

const Root: React.FC = () => {
  const {
    data: user,
    // hasEmitted,
    firstValuePromise,
  } = useUser();
  const { setAlert } = useContext(UIContext);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const isLogged = !!user;
  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  if (!isUserLoaded) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          clearFirestoreCache();
          setAlert({
            show: true,
            severity: 'info',
            message: 'You`ve successfully signed out',
          });
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
  };

  if (isLogged) {
    return (
      <Box>
        <Header handleSignOut={handleSignOut} user={user} />
        <Box sx={{ mt: 16, p: '28px 25px' }}>
          <AuthenticatedLayout>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route
                exact
                path="/login"
                component={() => <Redirect to="/" />}
              />
              <Route
                exact
                path="/register"
                component={() => <Redirect to="/" />}
              />
              <Route exact path="/flats" component={FlatsScreen} />
              <Route path="*" component={NotFoundScreen} />
            </Switch>
          </AuthenticatedLayout>
        </Box>
      </Box>
    );
  }

  return (
    <GuestLayout>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={SignInScreen} />
        <Route exact path="/register" component={SignUpScreen} />
        <Route exact path="/flats" component={() => <Redirect to="/login" />} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </GuestLayout>
  );
};

export default Root;
