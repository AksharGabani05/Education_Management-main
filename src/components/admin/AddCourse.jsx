import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useData } from '../../context/DataContext';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { addCourse } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ title, description });
    navigate('/admin/courses');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Course
        </Button>
      </form>
    </Box>
  );
};

export default AddCourse;