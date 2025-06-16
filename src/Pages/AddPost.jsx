
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function AddPost() {
  const navigate = useNavigate();
  const location = useLocation();

 
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from'); 

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const { user, token } = useContext(UserContext);

  function convertToBase64(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
    reader.onerror = (error) => console.log("Error: ", error);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (!token) {
      alert("You must be logged in");
      navigate('/login');
      return;
    }


axios.post(`http://localhost:3000/posts`, {
  title,
  body,
  image,
  createdBy: user?.email || 'Unknown',
  createdByName: user?.userName ||  user?.firstName || user?.email?.split('@')[0] ||'Unknown',
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

.then(() => {
 alert("Post created successfully!");
 if (from === 'home') {
 navigate('/home');
   } else {
navigate('/form');
 }
})
.catch(err => {
 console.error("Post creation error:", err);
  alert("Failed to create post.");
});
}
return (
<Box
sx={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to right, #3a3a3a, #d6d6d6)',
    overflow: 'hidden', 
    paddingX: 2,
    boxSizing: 'border-box', 
  }}
> 
 <Box
sx={{
 width: '100%',
 maxWidth: 700,
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 borderRadius: 4,
 p: { xs: 2, sm: 4 },
 boxShadow: 6,
 maxHeight: '90vh',
  overflowY: 'auto',
 }}>
 <form onSubmit={handleSubmit} autoComplete="off">
<Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#212121' }}>
  New Post
</Typography>
<TextField
 label="Title"
 variant="outlined"
 value={title}
onChange={(e) => setTitle(e.target.value)}
 fullWidth
 required
 sx={{
marginBottom: 2,
 backgroundColor: "#ffffff",
'& .MuiInputLabel-root': { color: '#757575' },
'& .MuiOutlinedInput-root': {
 '& fieldset': { borderColor: '#ccc' },
 '&:hover fieldset': { borderColor: '#ccc' },
 '&.Mui-focused fieldset': { borderColor: '#ccc' },
 },
 '& .MuiInputLabel-root.Mui-focused': { color: '#757575' },
}}
 />
<TextField
label="Description"
 variant="outlined"
 value={body}
onChange={(e) => setBody(e.target.value)}
  multiline
 rows={4}
 fullWidth
 required
 sx={{
 marginBottom: 2,
 backgroundColor: "#ffffff",
'& .MuiInputLabel-root': { color: '#757575' },
  '& .MuiOutlinedInput-root': {
  '& fieldset': { borderColor: '#ccc' },
'&:hover fieldset': { borderColor: '#ccc' },
 '&.Mui-focused fieldset': { borderColor: '#ccc' },
 },
 '& .MuiInputLabel-root.Mui-focused': { color: '#757575' },
  }}
/>
 <Button
 variant="outlined"
  component="label"
   fullWidth
   sx={{
  marginBottom: 2,
 height:50,
 fontSize: '16px',
 color: '#424242',
   borderColor: '#ccc',
   textTransform: 'none',
 '&:hover': {
  borderColor: '#aaa',
  backgroundColor: '#f9f9f9',
  },
   }}
   >
 Upload Image
<input
  type="file"
 accept="image/*"
 hidden
 onChange={convertToBase64}  />
 </Button>
 {image && (
 <Box sx={{ mb: 2, textAlign: 'center' }}>
<img
 src={image}
alt="preview"
 style={{
 width: 120,
 height: 120,
 objectFit: 'cover',
 borderRadius: 8,
 border: '1px solid #ccc',
  }}
/>
 </Box>
 )}
 <Button
  type="submit"
 fullWidth
 variant="contained"
sx={{
borderColor: '#aaa',
 backgroundColor: '#f9f9f9',
color: '#424242',
textTransform: "none",
 height:50,
fontSize: 16,
'&:hover': {
borderColor: '#aaa',
 backgroundColor: '#f9f9f9',
 },
 }}
 >
  Add Post
 </Button>
 </form>
 </Box>
 </Box>
  );
}
