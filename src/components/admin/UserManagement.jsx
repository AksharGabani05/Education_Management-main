import React, { useState } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagement = ({ users, courses, addUser, updateUser, deleteUser }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    role: '',
    enrolledCourses: [],
    teachingCourses: [],
  });

  const handleDialogOpen = (user = null) => {
    if (user) {
      setEditingUser(user);
      setNewUser(user);
    } else {
      setEditingUser(null);
      setNewUser({
        username: '',
        role: '',
        enrolledCourses: [],
        teachingCourses: [],
      });
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (editingUser) {
      updateUser(newUser);
    } else {
      addUser(newUser);
    }
    handleDialogClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleDialogOpen()}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Enrolled/Teaching Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === 'student'
                    ? user.enrolledCourses.map(courseId => (
                        <Chip
                          key={courseId}
                          label={courses.find(course => course.id === courseId)?.title}
                          style={{ margin: '2px' }}
                        />
                      ))
                    : user.teachingCourses.map(courseId => (
                        <Chip
                          key={courseId}
                          label={courses.find(course => course.id === courseId)?.title}
                          style={{ margin: '2px' }}
                        />
                      ))
                  }
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDialogOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={newUser.username}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          {newUser.role === 'student' && (
            <FormControl fullWidth margin="dense">
              <InputLabel id="enrolled-courses-label">Enrolled Courses</InputLabel>
              <Select
                labelId="enrolled-courses-label"
                name="enrolledCourses"
                multiple
                value={newUser.enrolledCourses}
                onChange={handleInputChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((courseId) => (
                      <Chip key={courseId} label={courses.find(course => course.id === courseId)?.title} />
                    ))}
                  </Box>
                )}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {newUser.role === 'teacher' && (
            <FormControl fullWidth margin="dense">
              <InputLabel id="teaching-courses-label">Teaching Courses</InputLabel>
              <Select
                labelId="teaching-courses-label"
                name="teachingCourses"
                multiple
                value={newUser.teachingCourses}
                onChange={handleInputChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((courseId) => (
                      <Chip key={courseId} label={courses.find(course => course.id === courseId)?.title} />
                    ))}
                  </Box>
                )}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddOrUpdate}>
            {editingUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserManagement;