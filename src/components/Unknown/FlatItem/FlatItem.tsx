import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  flat: {
    id: string;
    address?: string;
    city?: string;
    createdAt?: string;
    description?: string;
    preview?: string;
    price?: number;
  };
};

const FlatItem: React.FunctionComponent<Props> = ({ flat }) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push('/flats');
  };

  return (
    <Box
      component="li"
      sx={{
        mb: 5,
        listStyleType: 'none',
      }}
    >
      <Container fixed maxWidth="md" disableGutters>
        <Grid container>
          <Grid
            item
            // xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: `url(${flat.preview})`,
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
                height: '250px',
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    marginBottom: (t) => t.spacing(2),
                    fontWeight: 'bold',
                    fontSize: 40,
                    letterSpacing: '-1.5px',
                  }}
                >
                  {`$${flat.price} / night`}
                </Typography>

                <Typography
                  sx={{
                    marginBottom: (t) => t.spacing(3),
                    fontSize: 14,
                  }}
                >
                  {flat.address}
                </Typography>

                <Typography
                  sx={{
                    maxHeight: '57px',
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {flat.description}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={handleRedirect}
                sx={{
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.16px',
                  textTransform: 'uppercase',
                  border: '1px solid transparent',
                  ':hover': {
                    border: '1px solid teal',
                  },
                }}
              >
                Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FlatItem;
