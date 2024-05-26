"use client"

import React, { useState } from 'react';
import axios from 'axios';

const UpdateItemForm: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.patch('/api/updateItem', { id, newName });
      setMessage(response.data.message);
      console.log('Success:', response.data.message); // Log success message
    } catch (error) {
      setMessage('An error occurred');
      console.error('Error:', error); // Log error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newName">New Name:</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItemForm;
