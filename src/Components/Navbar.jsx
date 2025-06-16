import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const username =
    user?.userName ||
    user?.firstName ||
    user?.email?.split('@')[0] ||
    storedUser?.userName ||
    storedUser?.firstName ||
    storedUser?.email?.split('@')[0];
const handleLogin = () => {
  navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/logout');
};
return (
   <Box sx={{ position: 'relative' }}>
 <AppBar
 sx={{
 position: 'absolute',
   top: 0,
 right: 0,
 backgroundImage: 'linear-gradient(to right, #9e9e9e, #f5f5f5)',
  width: '100%',
   }}
 >
<Toolbar
sx={{
 display: 'flex',
 justifyContent: 'space-between',
 backgroundColor: '#424242',
 }}
   >
  <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
 <AutoAwesomeIcon sx={{ color: '#e0e0e0', fontSize: 60, mr: 1 }} />
 <Typography
 variant="h4"
 sx={{ color: '#e0e0e0', fontWeight: 'bold' }}
  >
   Avalon
  </Typography>
</Box>
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
{username ? (
<>
<Typography variant="body1" sx={{ color: 'white' }}>
 {username}
</Typography>
  <Button
  variant="contained"
   onClick={handleLogout}
 sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
  >
   Logout
 </Button>
  </>
 ) : (
 <>
 <Button
  variant="contained"
   onClick={handleLogin}
 sx={{
 backgroundColor: '#e0e0e0',
   color: '#424242',
   px: 3,
 textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
 alignItems: 'center',
   }} >
 Login
 </Button>
  <Button
    variant="outlined"
   color="inherit"
 onClick={handleRegister}
  sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
  >
  Register
  </Button>
  </>
 )}
</Box>
 </Toolbar>
 </AppBar>
  </Box>
   
  );
}
