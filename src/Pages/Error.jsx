import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();
return (
<Box
  sx={{
    width: '100vw',
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, #ff6f61, #d6d6d6)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    flexDirection: 'column',
    textAlign: 'center',
   
  }}
>
  <ErrorOutlineIcon sx={{ fontSize: 60, color: '#d32f2f' }} />
  <Typography variant="h4" sx={{ marginTop: 2, color: '#d32f2f' }}>
   Oops!
  </Typography>
  <Typography variant="body1" sx={{ marginTop: 1 }}>
  Something went wrong or the page doesn’t exist.
  </Typography>
  <Button
   variant="contained"
   sx={{ marginTop: 3, backgroundColor: '#d32f2f' }}
   onClick={() => navigate('/')}
     >
   Go Home
  </Button>
</Box>
  );
}