import React from 'react';
import { Box, Card, CardMedia, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Welcome() {
  const navigate = useNavigate();
 const handleStart = () => {
    navigate('/home');
  };
 return (

<Box
  sx={{
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#f9f9f9',
  }}
>
  <Card sx={{ position: 'relative', width: '100%', height: '100%', borderRadius: 0 }}>
    <CardMedia
      component="img"
      image="/images/WhatsApp Image 2025-06-14 at 12.23.51_22752000.jpg"
      alt="Welcome"
      sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
<Box
  sx={{
 position: 'absolute',
 top: 0,
 left: 0,
 width: '100%',
height: '100%',
color: 'white',
display: 'flex',
flexDirection: 'column',
justifyContent: 'center',
 alignItems: 'center',
 textAlign: 'center',
 p: 3,
  }}
 >
<Box
 sx={{
 position: 'absolute',
 top: 50,
left: 50,
  display: 'flex',
 alignItems: 'center',
 }}
>
 <AutoAwesomeIcon sx={{ color: '#e0e0e0', fontSize: 60, mr: 1 }} />
  <Typography variant="h4" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
 Avalon
 </Typography>
   </Box>
<Typography variant="h3" fontWeight="bold" sx={{ mt:3 }}>
Welcome to Avalon
 </Typography>
 <Button
 variant="contained"
sx={{ mt: 2, backgroundColor: '#e0e0e0', color: '#212121' }}
 onClick={handleStart}
 >
 Get Started
</Button>
 </Box>
 </Card>
</Box>

  );
}




