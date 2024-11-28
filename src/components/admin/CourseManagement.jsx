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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CourseManagement = ({ courses, users, addCourse, updateCourse, deleteCourse }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedTeacher: '',
  });

  const handleDialogOpen = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setNewCourse(course);
    } else {
      setEditingCourse(null);
      setNewCourse({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignedTeacher: '',
      });
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (editingCourse) {
      updateCourse(newCourse);
    } else {
      addCourse(newCourse);
    }
    handleDialogClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Course Management
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleDialogOpen()}>
        Add Course
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Assigned Teacher</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.startDate}</TableCell>
                <TableCell>{course.endDate}</TableCell>
                <TableCell>{users.find(user => user.id === course.assignedTeacher)?.username}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDialogOpen(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Course Title"
            type="text"
            fullWidth
            variant="standard"
            value={newCourse.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Course Description"
            type="text"
            fullWidth
            variant="standard"
            value={newCourse.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={newCourse.startDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={newCourse.endDate}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="assigned-teacher-label">Assigned Teacher</InputLabel>
            <Select
              labelId="assigned-teacher-label"
              name="assignedTeacher"
              value={newCourse.assignedTeacher}
              onChange={handleInputChange}
            >
              {users.filter(user => user.role === 'teacher').map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddOrUpdate}>
            {editingCourse ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseManagement;