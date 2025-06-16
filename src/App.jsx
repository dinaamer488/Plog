import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Form from './Pages/Form';
import AddPost from './Pages/AddPost';
import { UserProvider } from './UserContext';
import Update from './Components/Update';
// import ForgetPass from './Components/ForgetPass';
import Forgetpage from './Pages/Forgetpage';
import ResetPassword from './Components/ResetPassword';
import Error from './Pages/Error';
import LogoutPage from './Pages/LogoutPage';
import Welcome from './Pages/Welcome';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form" element={<Form />} />
          <Route path="/addpost" element={<AddPost />} />
        <Route path="/updatepost/:id" element={<Update />} />
        <Route path='/forgetpass' element={<Forgetpage/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Error/>} />
         <Route path="/logout" element={<LogoutPage/>} />
         

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;