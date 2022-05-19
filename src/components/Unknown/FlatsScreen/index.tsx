import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import flatsDB from '../../../common/firestoreDB';

const data = async () => {
  try {
    const res = await flatsDB.collection('flats').get();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

data();

const FlatsScreen: React.FC = () => {
  // const [cityes, setCityes] = useState([]);

  const handleSubmit = () => {
    console.log('aaaaaaaa');
  };
  return (
    <Box>
      {/* <Box>
        <Autocomplete
          freeSolo
          id="search"
          disableClearable
          options={cityes.map((option) => option.city)}
          renderInput={(params) => (
            <TextField
              variant="filled"
              {...params}
              label="City"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                disableUnderline: true,
                placeholder: 'Type something',
                endAdornment: (
                  <IconButton
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={handleSubmit}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </Box> */}
    </Box>
  );
};

export default FlatsScreen;
