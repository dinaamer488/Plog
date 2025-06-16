import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Box } from '@mui/material';
// import StaticPost from '../Components/StaticPost';
import Post from '../Components/Post';

export default function Home() {
  const { user } = useContext(UserContext); 

  return (
<>
 <Navbar />
  <Box
  sx={{
    width: '100%',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(to right, #f5f5f5, #ffffff)',
    padding: 4,
    boxSizing: 'border-box',
  }}
>

  <Post />
  {user && <Outlet />}
</Box>
    </>
  );
}


