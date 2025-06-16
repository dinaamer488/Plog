
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate ,useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Box,Button,TextField,Typography } from '@mui/material';

export default function Update() {
   const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
    const location = useLocation();

  const fromPage = location.state?.from || 'home';

  const [post, setPost] = useState({
    title: '',
    body: '',
    image: ''
  });

  
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Error loading post:", err));
  }, [id]);

  
  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

 
  const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;  

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => setPost({ ...post, image: reader.result });
  reader.onerror = (error) => console.error("Error reading image:", error);
};

  function convertToBase64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

 
function handleSubmit(e) {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username =
    user?.userName ||
    user?.firstName ||
    user?.email?.split('@')[0] ||
    storedUser?.userName ||
    storedUser?.firstName ||
    storedUser?.email?.split('@')[0] ||
    "Unknown";

  const updatedPost = {
    ...post,
    createdBy: username,
  };

  axios
    .put(`http://localhost:3000/posts/${id}`, updatedPost, {
      headers: {
        Authorization: `Bearer ${user?.token || ''}`,
      },
    })
    .then(() => {
      alert("Post updated successfully!");
      navigate(fromPage === 'form' ? '/form' : '/home');
    })
    .catch((err) => {
      alert("Update failed: " + (err.response?.data || err.message));
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
   padding: 4,
      boxShadow: 5,
    
    }}
  >
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#212121',
        mb: 3,
      }}
    >
      Edit Post
    </Typography>

    <form onSubmit={handleSubmit}>
 <TextField
  name="title"
  label="Title"
  variant="outlined"
  value={post.title}
  onChange={handleInput}
  required
  fullWidth
  sx={{
    mb: 2,
    backgroundColor: "#ffffff",
    '& .MuiInputLabel-root': {
      color: '#757575',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', 
      },
      '&:hover fieldset': {
        borderColor: '#ccc',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ccc',
      },
 },
 '& .MuiInputLabel-root.Mui-focused': {
 color: '#757575', 
},
}}
/>

<TextField
  name="body"
  label="Body"
  variant="outlined"
  value={post.body}
  onChange={handleInput}
  required
  fullWidth
  multiline
  rows={4}
  sx={{
    mb: 2,
  backgroundColor: "#ffffff",
'& .MuiInputLabel-root': {
   color: '#757575', 
  },
'& .MuiOutlinedInput-root': {
'& fieldset': {
 borderColor: '#ccc', 
 },
'&:hover fieldset': {
borderColor: '#ccc',
 },
'&.Mui-focused fieldset': {
 borderColor: '#ccc',
 },
},
'& .MuiInputLabel-root.Mui-focused': {
color: '#757575', 
},
}}
/>
 <Button
  variant="outlined"
  component="label"
  fullWidth
  sx={{
    marginBottom: 2,
    height: 50, 
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
    onChange={handleImage}
  />
</Button>
{post.image && (
<Box sx={{ marginBottom: 2, textAlign: 'center' }}>
 <img
src={post.image}
alt="preview"
style={{
 width: 120,
height: 120,
border: '1px solid #ccc',
 }}
/>
  </Box>
 )}
 <Button
 type="submit"
variant="contained"
fullWidth
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
 Edit
</Button>
</form>
  </Box>
</Box>

  );
}

