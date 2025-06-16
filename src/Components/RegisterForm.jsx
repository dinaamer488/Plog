import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import TagFacesIcon from '@mui/icons-material/TagFaces';

import {
  Button,
  Box,
  Typography,
  Link,
  Stack,
  FormControlLabel,
  Checkbox,
  TextField
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const CustomTextField = styled(TextField)({
  marginBottom: '16px',
  width: '100%',
});

const validateFirstName = value => {
  if (!value) return 'First name is required';
  if (value.length < 2) return 'Too short';
  if (value.length > 30) return 'Too long';
};

const validateLastName = value => {
  if (!value) return 'Last name is required';
  if (value.length < 2) return 'Too short';
  if (value.length > 30) return 'Too long';
};

const validateEmail = value => {
  if (!value) return 'Email is required';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) return 'Invalid email';
};

const validatePassword = value => {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'At least 6 characters';
};

const validateConfirmPassword = (value, values) => {
  if (!value) return 'Confirm your password';
  if (value !== values.password) return 'Passwords must match';
};

const validatePhone = value => {
  if (!value) return 'Phone is required';
  if (!/^[0-9]{11}$/.test(value)) return 'Phone must be 11 digits';
};

const validateRequired = field => value => !value ? `${field} is required` : undefined;

export default function RegisterForm() {
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
  p: 4,
  bgcolor: 'rgba(255, 255, 255, 0.95)',
  display: 'flex',
  flexDirection: 'column',
   justifyContent: 'center',
  }}
   >
  <Typography variant="h4" align="center" gutterBottom sx={{ color: '#424242' }}>
   REGISTER
  </Typography>
<Formik
 initialValues={{
 firstName: '',
  lastName: '',
  email: '',
 password: '',
 confirmPassword: '',
 phoneNumber: '',
 month: '',
 day: '',
 year: '',
   }}

onSubmit={async (values, { setSubmitting, setErrors }) => {
  try {
   
    const newUser = {
      email: values.email,
      password: values.password
    };

    await axios.post('http://localhost:3000/register', newUser);

    const res = await axios.post('http://localhost:3000/login', {
      email: values.email,
      password: values.password
    });

    const { accessToken, user } = res.data;

   
    const updatedUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      birthday: `${values.day}-${values.month}-${values.year}`
    };

    await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

  
    const fullUser = { ...user, ...updatedUser };

 
    localStorage.setItem('user', JSON.stringify(fullUser));
    localStorage.setItem('token', accessToken);

    login(fullUser, accessToken);
  navigate('/login');
  } catch (error) {
    console.error('Registration error:', error);
    setErrors({ email: 'Registration failed. Please try again.' });
  } finally {
    setSubmitting(false);
  }
}}
    >
{({ errors, touched, values }) => (
 <Form>
<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
 <Field
 name="firstName"
 validate={validateFirstName}
 as={CustomTextField}
 label="First Name"
  error={touched.firstName && Boolean(errors.firstName)}
 helperText={touched.firstName && errors.firstName}
sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
/>
 <Field
 name="lastName"
 validate={validateLastName}
as={CustomTextField}
label="Last Name"
error={touched.lastName && Boolean(errors.lastName)}
 helperText={touched.lastName && errors.lastName}
  sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
 />
 </Stack>
<Field name="email" validate={validateEmail}>
 {({ field }) => (
  <CustomTextField
 {...field}
 label="Email"
 type="email"
error={touched.email && Boolean(errors.email)}
helperText={touched.email && errors.email}
sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
/>
)}</Field>
<Field name="password" validate={validatePassword}>
   {({ field }) => (
  <CustomTextField
 {...field}
  label="Password"
  type="password"
   error={touched.password && Boolean(errors.password)}
   helperText={touched.password && errors.password}
   sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
   />
)}
 </Field>
 <Field name="confirmPassword" validate={val => validateConfirmPassword(val, values)}>
 {({ field }) => (
<CustomTextField
 {...field}
 label="Confirm Password"
 type="password"
 error={touched.confirmPassword && Boolean(errors.confirmPassword)}
 helperText={touched.confirmPassword && errors.confirmPassword}
 sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
  />
 )}
 </Field>
<Field name="phoneNumber" validate={validatePhone}>
 {({ field }) => (
<CustomTextField
{...field}
 label="Phone Number"
error={touched.phoneNumber && Boolean(errors.phoneNumber)}
 helperText={touched.phoneNumber && errors.phoneNumber}
 sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
/>
)}
</Field>
<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
 <Field name="month" validate={validateRequired('Month')}>
 {({ field }) => (
  <CustomTextField
 {...field}
 label="Month"
 error={touched.month && Boolean(errors.month)}
helperText={touched.month && errors.month}
 sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
  /> )}
 </Field>
<Field name="day" validate={validateRequired('Day')}>
{({ field }) => (
 <CustomTextField
  {...field}
label="Day"
 error={touched.day && Boolean(errors.day)}
  helperText={touched.day && errors.day}
  sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
 />
  )}
 </Field>
  <Field name="year" validate={validateRequired('Year')}>
 {({ field }) => (
<CustomTextField
{...field}
label="Year"
 error={touched.year && Boolean(errors.year)}
 helperText={touched.year && errors.year}
  sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}
 />
 )}
</Field>
</Stack>
<FormControlLabel
 sx={{ paddingBottom: 2 }}
 control={<Checkbox />}
 label="Remember me"
/>
<Button variant="contained" fullWidth type="submit"
sx={{ backgroundColor: '#e0e0e0', color: '#424242' }}>
 Register
 </Button>
<Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
<Link component="button" variant="body2" onClick={() => navigate('/login')}
sx={{ color: '#424242', textDecoration: 'none' }}>
 Already have an account? Login
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
    <AutoAwesomeIcon sx={{ color: '#e0e0e0', fontSize: 60, mr: 1 }} />
    <Typography variant="h5" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
      Avalon
    </Typography>
  </Box>

  <Box
    sx={{
      position: 'absolute',
      top: 300,
      left: 200,
      borderRadius: 1,
      p: 2,
      color: 'white',
      maxWidth: '80%',
    }}
  >
    <Typography variant="h3" component="h1">

      Welcome <TagFacesIcon sx={{fontSize:30}}/>
    </Typography>
    <Typography>Join us and enjoy personalized features.</Typography>
  </Box>
</Box>

      </Stack>
    </Box>
  );
}
