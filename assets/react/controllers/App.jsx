// App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './User/List';
import AddUser from './User/Add';
import Groups from './Group/List';
import Navbar from './Navigation/List'; // Corrected the component name

function Navigation() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/user/add' element={<AddUser />} />
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
