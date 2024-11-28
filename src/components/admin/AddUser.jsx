import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useData } from '../../context/DataContext';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  const { addUser } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ username, password, role });
    navigate('/admin/users');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
          required
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add User
        </Button>
      </form>
    </Box>
  );
};

export default AddUser;