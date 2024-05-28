'use client'
import React, { useState } from 'react';
import { AddUser } from '../lib/user/user.method'; // Assurez-vous que le chemin est correct

interface UserCreateInput {
  username: string;
  email: string;
  password: string;
}

const AddUserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const inputCreateUser: UserCreateInput = { username, email, password };

    try {
      const { user } = await AddUser(inputCreateUser);
      console.log('User added:', user);
      // Vous pouvez ajouter une logique supplémentaire ici, comme afficher un message de succès
    } catch (error) {
      console.error('Error adding user:', error);
      // Gérer l'erreur ici
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;