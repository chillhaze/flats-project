import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Autocomplete,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import flatsDB from '../../../common/firestoreDB';
import FlatItem from '../FlatItem/FlatItem';

// import cityes from '../../../common/cityes';

interface IFlat {
  id: string;
  address?: string;
  city?: string;
  createdAt?: string;
  description?: string;
  preview?: string;
  price?: number;
}

type TFlats = null | IFlat[];

const FlatsScreen: React.FC = () => {
  const [flats, setFlats] = useState<TFlats>(null);

  useEffect(() => {
    try {
      flatsDB.collection('flats').onSnapshot((snapshot) => {
        const data: IFlat[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('data', data);

        setFlats(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = () => {
    console.log('filter submit');
  };

  return (
    <Box>
      <Box
        component={Paper}
        sx={{
          position: 'fixed',
          top: 80,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        {flats && (
          <Autocomplete
            sx={{
              width: '450px',
            }}
            freeSolo
            id="search"
            disableClearable
            options={flats.map((option) => option.city)}
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
        )}
      </Box>

      <Box sx={{ fontWeight: 600, fontSize: 30, mt: 20, mb: 10 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 30 }}>
          Flats to rent
        </Typography>
      </Box>

      <Box component="ul" sx={{ p: 0 }}>
        {flats?.map((flat) => (
          <FlatItem flat={flat} key={flat.id} />
        ))}
      </Box>
    </Box>
  );
};

export default FlatsScreen;
