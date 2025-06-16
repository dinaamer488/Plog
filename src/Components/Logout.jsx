import React, { useContext } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Logout() {
  const navigate = useNavigate();
  // const { setUser } = useContext(UserContext);

  const handleLogout = () => {
   
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };
  const handleCancel = () => {
    navigate('/login');
  };

  return (
   <Box
  sx={{
    width: '100vw',
    height: '100vh',
backgroundImage: 'linear-gradient(to right, #1c1c1c, #d3d3d3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  }}
>
<Box>
<Typography variant="h4" sx={{ color: 'red', mb: 2 }}>
   Oh no! You're leaving...
  </Typography>
<Typography variant="body1" sx={{ mb: 3,color:'white'}}>
Are you sure you want to logout?
</Typography>
<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
  <Button
   onClick={handleLogout}
    sx={{ backgroundColor: '#ba000d', color: 'white' }}
  >
  Yes, Logout
  </Button>
  <Button
  onClick={handleCancel}
  sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
    >
  No, Stay Logged In
  </Button>
  </Stack>
   </Box>
   <Box>
        <ExitToAppIcon sx={{ color: 'red', fontSize: 100 }} />
      </Box>
    </Box>
  );
}
