// App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './User/List';
import AddUser from './User/Add';
import EditUser from './User/Edit'; 
import DeleteUser from './User/Delete'; 
import AddGroup from './Group/Add'; 
import Groups from './Group/List';
import ShowUser from './User/Show';
import Navigate from './Navigation/List';
import AttachUserToGroups from './User/AttachUserToGroups';

function Navigation() {
  return (
    <Router>
      <Navigate />
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path="/user/edit/:userId" element={<EditUser />} />
        <Route path="/user/delete/:userId" element={<DeleteUser />} />
        <Route path="/users/:userId/attach-to-groups" element={<AttachUserToGroups />} />
        <Route path="/user/show/:userId" element={<ShowUser />} />
        <Route path='/group/add' element={<AddGroup />} />
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
