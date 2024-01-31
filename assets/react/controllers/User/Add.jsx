import React, { useState } from 'react';
import axios from 'axios';

const Add = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    createdDate: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifier si tous les champs obligatoires sont remplis
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'type',
        'createdDate',
        'password',
      ];
      const hasEmptyFields = requiredFields.some((field) => !formData[field]);

      if (!hasEmptyFields) {
        // Effectuez une requête POST pour ajouter un nouvel utilisateur
        await axios.post('http://127.0.0.1:8000/api/users', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/Id+json', // Assurez-vous que le Content-Type est correct
            },
            });
        // Appeler la fonction de l'App pour mettre à jour la liste des utilisateurs
        onAddUser(formData);

        // Réinitialiser le formulaire après l'ajout
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          type: '',
          createdDate: '',
          password: '',
        });
      } else {
        console.error('Tous les champs obligatoires doivent être remplis.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="createdDate">Created Date:</label>
          <input
            type="date"
            id="createdDate"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Add;
