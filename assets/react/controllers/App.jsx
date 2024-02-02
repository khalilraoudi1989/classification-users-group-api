// App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigate from './Navigation/List';
import Users from './User/List';
import AddUser from './User/Add';
import EditUser from './User/Edit'; 
import DeleteUser from './User/Delete';
import ShowUser from './User/Show';
import AddGroup from './Group/Add'; 
import Groups from './Group/List';
import EditGroup from './Group/Edit';
import ShowGroup from './Group/Show';
import DeleteGroup from './Group/Delete';
import AttachUserToGroups from './User/AttachUserToGroups';
import Login from './Auth/Login';
import GoogleLoginHandler from './Auth/handleGoogleLogin';

function Navigation() {
  return (
    <Router>
      <Navigate />
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login-with-google' element={<GoogleLoginHandler />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path="/user/edit/:userId" element={<EditUser />} />
        <Route path="/user/delete/:userId" element={<DeleteUser />} />
        <Route path="/users/:userId/attach-to-groups" element={<AttachUserToGroups />} />
        <Route path="/user/show/:userId" element={<ShowUser />} />
        <Route path='/group/add' element={<AddGroup />} />
        <Route path="/group/edit/:groupId" element={<EditGroup />} />
        <Route path="/group/show/:groupId" element={<ShowGroup />} />
        <Route path="/group/delete/:groupId" element={<DeleteGroup />} />
      </Routes>
    </Router>
  );
}

class NavigationElement extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Navigation />
      </React.StrictMode>
    );
  }
}

customElements.define('post-navigation', NavigationElement);
