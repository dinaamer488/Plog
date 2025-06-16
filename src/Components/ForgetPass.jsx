
import React, { useState } from 'react';
import { Box, Stack, Typography, Button, TextField } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  return (
    <Box
      sx={{
 Height: '100vh',
 width: '100vw',
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 bgcolor: '#f5f5f5',
 }}
 >
  <Stack
 direction="row"
 spacing={0}
 sx={{

height:'100vh',
width: '100%',
  boxShadow: 3,
  borderRadius: 3,
  overflow: 'hidden',
 bgcolor: 'white',
 }}
 >
 <Box
 sx={{
 flex: 1,
 display: 'flex',
  flexDirection: 'column',
 justifyContent: 'center',
 alignItems: 'center',
 bgcolor: '#fafafa',
 }}
 >
<HttpsIcon sx={{ fontSize: 60, color: '#424242', mb: 2 }} />
<Typography variant="h5" sx={{ mb: 3, color: '#424242' }}>
 Forgot Password
 </Typography>
 <Formik
 initialValues={{ email: '' }}
 onSubmit={(values) => {
setMessage(`Reset link sent to: ${values.email}`);
 setTimeout(() => {
 navigate(`/reset-password?email=${encodeURIComponent(values.email)}`);
}, 3000);
}}
 >
{() => (
 <Form style={{ width: '100%' ,marginLeft:30}}>
 <Field name="email">
{({ field }) => (
  <TextField
 {...field}
 label="Email"
type="email"
fullWidth
margin="normal"
required
sx={{
backgroundColor: '#e0e0e0',
color: '#424242',
}}
 />
  )}
 </Field>
 <Button
type="submit"
fullWidth
sx={{
backgroundColor: '#e0e0e0',
color: '#424242',
 mt: 2,
fontWeight: 'bold',
 }}
 >
   Send Reset Link
  </Button>
</Form>
 )}
</Formik>
 {message && (
 <Typography variant="body2" color="green" mt={2} align="center">
  {message} — Redirecting...
 </Typography>
)}
 </Box>
 <Box
sx={{
  flex: 1,
  minHeight: 700,
  position: 'relative',
  backgroundImage: 'url(/images/pass.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',  
  backgroundPosition: 'center',
}}
 >
    </Box>
      </Stack>
    </Box>
  );
}


