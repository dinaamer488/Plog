import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
 const res = await axios.get(`http://localhost:3000/users?email=${email}`);
 const user = res.data[0];
if (!user) {
 alert('User not found');
        return;
}
await axios.patch(`http://localhost:3000/users/${user.id}`, {
        password: password,
 });

//  alert('Password updated successfully!');
  navigate('/login');
  alert('Password updated successfully!');
  } catch (err) {
   alert('Error updating password');
}
};
 return (
 <Box
 sx={{
  width: "100vw",
 height:'100vh',
  borderRadius: 2,
 boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  backgroundImage: 'linear-gradient(to right, #3a3a3a, #d6d6d6)'
}}
 >
<Box >
 < CheckCircleIcon sx={{fontSize:80,marginLeft:90,marginTop:30,color:'white'}} />
</Box>
 <Typography sx={{ textAlign: 'center', mb: 2 ,fontSize:30 ,color:'white'}}>Reset Your Password</Typography>
<TextField
 type="password"
 placeholder="New Password"
 value={password}
  onChange={(e) => setPassword(e.target.value)}
 fullWidth
  margin="normal"
 required
 sx={{
backgroundColor: '#e0e0e0',
color: '#424242',
 borderBlockColor: '#424242',
 width:'60%',
 marginLeft:40,
 }}
 />
<Button
onClick={handleReset}
fullWidth
 sx={{ backgroundColor: '#e0e0e0', color: '#424242', mt: 2 ,  width:'60%',
 marginLeft:40,}} >
 Reset Password
 </Button>
 </Box>
  );
}

