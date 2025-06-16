
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function StaticPost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const username =
    user?.userName || user?.firstName || user?.email?.split('@')[0];

  const loadPosts = () => {
    axios
      .get('http://localhost:3000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error("Load posts error:", err));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  
  const handleEditPost = (id) => {
    navigate(`/updatepost/${id}`, { state: { from: 'form' } });
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Would you like to delete this post?")) {
      axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Post deleted successfully!");
        loadPosts();
      })
      .catch(err => console.error("Delete error:", err));
    }
  };
 const handleAdd = () => navigate('/addpost');
  const handleHome = () => navigate('/home');
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
return (
  <>

<Box
 sx={{
width: '99vw',
 minHeight: '100vh',
overflowX: 'hidden',
overflowY: 'auto',
 backgroundImage: 'linear-gradient(to right, #3a3a3a, #d6d6d6)',
  boxSizing: 'border-box',
 padding: 2,
 }}
 >
   {user && (
<Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
 <Button onClick={handleAdd}
variant="outlined"
 sx={{
 backgroundColor: '#616161', 
 color: '#ffffff',            
 border: '1px solid #424242',  
 '&:hover': {
   backgroundColor: '#424242', 
   borderColor: '#616161',     
 },
  }}> Add New Post </Button>
<Button
onClick={handleHome}
variant="outlined"
sx={{
backgroundColor: '#616161',
 color: '#ffffff',            
 border: '1px solid #424242', 
'&:hover': {
 backgroundColor: '#424242', 
 borderColor: '#616161',    
  },
  }}
 >
 Go Home
 </Button>
 </Stack>
 )}
 <Box
sx={{
 maxWidth: '900px',
margin: 'auto',
 padding: '20px',
 border: '2px solid #ccc',
 borderRadius: '12px',
 backgroundColor: '#f9f9f9',
}}
>
<Box
 sx={{
 display: 'grid',
 gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 3,
  boxShadow: '0px 3px 12px #424242'
 }}
 >
 {posts.map((post) => (
  <Card key={post.id} sx={{ marginBottom: 2 }}>
  <CardContent>
  {post.image && (
  <img
  src={post.image}
  width="100%"
  height="150"
  alt="Post"
  style={{ objectFit: 'cover', borderRadius: '8px' }}
  />
  )}
  <Typography variant="h6" mt={1}>{post.title}</Typography>
 <Typography variant="body2" color="text.secondary">
 {post.body}
</Typography>
{user && post.createdBy === userFromLocalStorage?.email && (
<Stack direction="row" spacing={2} sx={{ mt: 1 }}>
<Button onClick={() => handleEditPost(post.id)}
 startIcon={<EditIcon />}
 size="small"
 sx={{
  color: '#1565c0',
  border: '1px solid #1565c0',
  '&:hover': { backgroundColor: '#e3f2fd' },
}}> Edit </Button>
 <Button onClick={() => handleDeletePost(post.id)}
 startIcon={<DeleteIcon />}
 size="small"
sx={{
 color: '#d32f2f',
  border: '1px solid #d32f2f',
  '&:hover': { backgroundColor: '#ffebee' },}} >
 Delete
</Button>
 </Stack>
 )}
 <Typography
  variant="caption"
 sx={{
 display: 'block',
 marginTop: 1,
 color: 'gray',
  fontStyle: 'italic',
   }}
   >
  Done by {post.createdByName || post.createdBy || 'Unknown'}
 </Typography>
 </CardContent>
 </Card>
 ))}
 </Box>
{/* {user && (
<Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', marginTop: 2 }}>
 <Button onClick={handleAdd}
variant="outlined"
sx={{
 color: '#424242',
borderColor: '#424242',
 '&:hover': { backgroundColor: '#f0f0f0' },
}}> Add New Post </Button>
<Button
onClick={handleHome}
 variant="outlined"
   sx={{
color: '#424242',
 borderColor: '#424242',
 '&:hover': { backgroundColor: '#f0f0f0' },
 }}
 >
 Go Home
 </Button>
 </Stack>
 )} */}
 </Box>
  </Box>
  </>
 );
}
