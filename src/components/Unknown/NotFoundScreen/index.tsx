import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFoundScreen: React.FC = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Page not found</Typography>
    </Box>
  );
};

export default NotFoundScreen;
