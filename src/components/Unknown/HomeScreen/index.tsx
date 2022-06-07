import React from 'react';
import { Box, Button } from '@mui/material';

import { useHistory } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/flats');
  };

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Box>
        <Button variant="contained" onClick={handleRedirect}>
          Explore Flats
        </Button>
      </Box>
    </Box>
  );
};

export default HomeScreen;
