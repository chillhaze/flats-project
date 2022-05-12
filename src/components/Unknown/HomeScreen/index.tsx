import React, { useContext } from 'react';
import { Box } from '@mui/material';
import firebase from 'firebase/app';
import { useUser } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import Header from '../Header';
import { UIContext } from '../UIContext';

const HomeScreen: React.FC = () => {
  const { data: user } = useUser();
  const { setAlert } = useContext(UIContext);

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

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Header handleSignOut={handleSignOut} user={user} />
    </Box>
  );
};

export default HomeScreen;
