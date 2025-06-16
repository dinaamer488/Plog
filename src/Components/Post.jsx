import React, { useEffect, useState, useContext } from 'react';
import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const { token, user } = useContext(UserContext);
  const navigate = useNavigate();

  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const username =
   userFromLocalStorage?.userName ||userFromLocalStorage?.firstName ||userFromLocalStorage?.email?.split('@')[0];

  const loadPost = () => {
    axios.get('http://localhost:3000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error("Load posts error:", err));
  };

  useEffect(() => {
    loadPost();
  }, []);

  const handleAdd = () => navigate('/addpost');

  const handleEditPost = (id) => {
    navigate(`/updatepost/${id}`);
  };
const handleDeletePost = (id) => {
   const confirmDelete = window.confirm("Would you like to delete this post?");
   if (confirmDelete) {
   fetch(`http://localhost:3000/posts/${id}`, {
 method: 'DELETE',
  headers: {
   'Authorization': `Bearer ${user?.token}`
  }
  })
 .then(() => {
 alert("Post deleted successfully!");
 loadPost();
  })
 .catch(err => console.error("Delete error:", err));
    }
 };
return (
 <>
 <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 3 ,marginTop: 5,px: 3}}>
<Button
onClick={handleAdd}
variant="contained"
sx={{
 px: 4,
 height: 30,
fontSize: 16,
backgroundColor: '#212121',
color: 'white',
borderRadius: 2,
textTransform: 'none',
'&:hover': {
 backgroundColor: '#424242',
},
}}
>
 Add New Post
</Button>
</Box>
<Box
sx={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
gap: 4,
 px: 3,
 marginTop:5,
 }}
  >

{posts.map((post) => (
   <Card
key={post.id}
 sx={{
  borderRadius: 3,
  overflow: 'hidden',
   boxShadow: 4,
  backgroundColor: '#f5f5f5',
  }}
  >
 {post.image && (
  <Box
   component="img"
   src={post.image}
   alt="Post"
   sx={{ width: '100%', height: 180, objectFit: 'cover' }}
  />
 )}
    <CardContent>
 <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
   {post.title}
 </Typography>
 <Typography variant="body2" sx={{ mb: 2 }}>
 {post.body}
 </Typography>
 {user && post.createdBy === userFromLocalStorage?.email && (
  <Stack direction="row" spacing={2}>
    <Button
      onClick={() => handleEditPost(post.id)}
      startIcon={<EditIcon />}
      size="small"
      sx={{
        color: '#1565c0',
        border: '1px solid #1565c0',
        '&:hover': { backgroundColor: '#e3f2fd' },
      }}
    >
      Edit
    </Button>
    <Button
      onClick={() => handleDeletePost(post.id)}
      startIcon={<DeleteIcon />}
      size="small"
      sx={{
        color: '#d32f2f',
        border: '1px solid #d32f2f',
        '&:hover': { backgroundColor: '#ffebee' },
      }}
    >
      Delete
    </Button>
  </Stack>
)}

<Typography
  variant="caption"
  sx={{ display: 'block', color: 'gray', marginTop: 1 }}
>
  Done by {post.createdByName || post.createdBy?.split('@')[0] || 'Unknown'}
</Typography>


</CardContent>
</Card>
))}
  </Box>
{user && (
<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>

 </Box>

  )}

</>

  );
}
