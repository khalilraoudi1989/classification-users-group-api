// Navigation.jsx
import React from 'react';
import { Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';

const Navigate= () =>{
  return (
    
    <Navbar style={{ backgroundColor: '#f8f9fa' }} color="light" light expand="lg">
  <Container>
    <div style={{ display: 'flex', alignItems: 'center' }} className="collapse navbar-collapse" id="navbarSupportedContent">
      <Nav style={{ flex: 1, marginRight: '10px', listStyle: 'none', padding: 0 }}>
        <NavItem style={{ marginRight: '10px', display: 'inline' }}>
          <NavLink tag={Link} to="/users" style={{ color: '#343a40', textDecoration: 'none', outline: 'none' }}>User</NavLink>
        </NavItem>
        <NavItem style={{ marginRight: '10px', display: 'inline' }}>
          <NavLink tag={Link} to="/groups" style={{ color: '#343a40', textDecoration: 'none', outline: 'none' }}>Group</NavLink>
        </NavItem>
      </Nav>
    </div>
  </Container>
</Navbar>



  );
}
export default Navigate;
