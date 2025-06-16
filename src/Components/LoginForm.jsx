
import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const CustomTextField = styled(TextField)({
marginBottom: '16px',
 width: '100%',
});
export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
 return (
<Box
sx={{
  minHeight: '100vh',
 width: '100vw',
 display: 'flex',
  justifyContent: 'center',
 alignItems: 'center',
 bgcolor: '#f5f5f5',
}}
 >
 <Stack
 direction="row"
 spacing={4}
 sx={{
 minHeight: '100vh',
  width: '100vw',
   boxShadow: 3,
 borderRadius: 3,
  overflow: 'hidden',
  bgcolor: 'white',
 }}
 >
 <Box
 sx={{
  flex: 1,
   padding: 4,
   display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
 }}
>
 <Typography variant="h4" align="center" gutterBottom sx={{ color: '#424242' }}>
 LOGIN
</Typography>
<Formik
 initialValues={{ email: '', password: '' }}
    onSubmit={async (values, { setSubmitting, setErrors }) => {
 try {
 const res = await axios.post('http://localhost:3000/login', values);
 const { user, accessToken } = res.data;
 localStorage.setItem('token', accessToken);
  localStorage.setItem('user', JSON.stringify(user));
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  login(user, accessToken);
 navigate('/home');
 } catch (err) {
  console.error('Login error:', err);
  setErrors({ email: 'Login failed. Check your credentials.' });
 } finally {
    setSubmitting(false);
   }
  }}
   >
 {({ errors, touched }) => (
<Form>
<Field name="email">
 {({ field }) => (
  <CustomTextField
   {...field}
   label="Email"
    type="email"
   error={touched.email && Boolean(errors.email)}
   helperText={touched.email && errors.email}
  sx={{ backgroundColor: '#e0e0e0', color: '#424242', mb: 2 }}
  fullWidth
  />
  )}
 </Field>
 <Field name="password">
   {({ field, meta }) => (
  <CustomTextField
   {...field}
   label="Password"
    type="password"
     error={meta.touched && Boolean(meta.error)}
    helperText={meta.touched && meta.error}
   sx={{ backgroundColor: '#e0e0e0', color: '#424242', mb: 2 }}
   fullWidth
   />
   )}
 </Field>
 <FormControlLabel
  sx={{ paddingBottom: 2 }}
  control={<Checkbox />}
  label="Remember me"
  />
<Button
   variant="contained"
   fullWidth
     type="submit"
   sx={{ backgroundColor: '#e0e0e0', color: '#424242', mb: 2 }}
     >
    Login
  </Button>
<Stack direction="row" spacing={2} justifyContent="center" mt={2}>
    <Link
    component="button"
  type="button"
  onClick={() => navigate('/register')}
  sx={{ color: '#424242', textDecoration: 'none' }}
  >
  New User? Signup
 </Link>
 <Link
     component="button"
     type="button"
   onClick={() => navigate('/forgetpass')}
   sx={{ color: '#424242', textDecoration: 'none' }}
     >
     Forgot Password?
   </Link>
 </Stack>
   </Form>
    )}
 </Formik>
 </Box>
 <Box
 sx={{
  flex: 1,
 height: 'auto',
 minHeight: 500,
 position: 'relative',
 backgroundImage: 'url(/images/Login.jpg)',
 backgroundSize: 'cover',
 backgroundPosition: 'center',
}}
   >
  <Box
 sx={{
 position: 'absolute',
 top: 16,
 left: 16,
 display: 'flex',
alignItems: 'center',
 borderRadius: 2,
 px: 2,
 py: 1,
}}
 >
 <AutoAwesomeIcon sx={{ color: '#e0e0e0', fontSize: 70, mr: 1 }} />
  <Typography variant="h5" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
    Avalon
 </Typography>
</Box>
<Box
  sx={{
 position: 'absolute',
 top: 300,
 left: 180,
 borderRadius: 1,
 padding: 2,
   color: 'white',
    maxWidth: '80%',
 }}
  >
 <Typography variant="h3" component="h1">
 Welcome Back!
  </Typography>
 </Box>
 </Box>
</Stack>
</Box>
  );
}
