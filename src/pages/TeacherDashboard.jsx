import React, { useState } from 'react';
import {
  Box, Container, Grid, Paper, Typography, List, ListItem, ListItemText, Button,
  Card, CardContent, CardActions, Divider, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, IconButton
} from '@mui/material';
import {
  Assignment as AssignmentIcon, Class as ClassIcon, People as PeopleIcon,
  Announcement as AnnouncementIcon, Edit as EditIcon, Delete as DeleteIcon
} from '@mui/icons-material';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics 101', students: 30 },
    { id: 2, name: 'Physics 202', students: 25 },
    { id: 3, name: 'Computer Science 303', students: 35 },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Algebra Quiz', course: 'Mathematics 101', dueDate: '2023-06-15' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics 202', dueDate: '2023-06-20' },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Exam Schedule Posted', date: '2023-06-10' },
    { id: 2, title: 'New Learning Resources Available', date: '2023-06-08' },
  ]);

  const [openManageCourses, setOpenManageCourses] = useState(false);
  const [openAllAnnouncements, setOpenAllAnnouncements] = useState(false);
  const [openNewAssignment, setOpenNewAssignment] = useState(false);
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [openViewStudents, setOpenViewStudents] = useState(false);
  const [openGradeAssignments, setOpenGradeAssignments] = useState(false);
  const [openScheduleClass, setOpenScheduleClass] = useState(false);

  const [newCourse, setNewCourse] = useState({ name: '', students: 0 });
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '' });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', date: '' });
  const [editingCourse, setEditingCourse] = useState(null);

  const handleManageCourses = () => setOpenManageCourses(true);
  const handleCloseManageCourses = () => {
    setOpenManageCourses(false);
    setNewCourse({ name: '', students: 0 });
    setEditingCourse(null);
  };

  const handleAddOrUpdateCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(course => course.id === editingCourse.id ? { ...course, ...newCourse } : course));
    } else {
      setCourses([...courses, { ...newCourse, id: Date.now() }]);
    }
    handleCloseManageCourses();
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({ name: course.name, students: course.students });
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleViewAllAnnouncements = () => setOpenAllAnnouncements(true);

  const handleNewAssignment = () => setOpenNewAssignment(true);
  const handleAddNewAssignment = () => {
    setAssignments([...assignments, { ...newAssignment, id: Date.now() }]);
    setOpenNewAssignment(false);
    setNewAssignment({ title: '', course: '', dueDate: '' });
  };

  const handleNewAnnouncement = () => setOpenNewAnnouncement(true);
  const handleAddNewAnnouncement = () => {
    const newAnnouncementWithDate = { ...newAnnouncement, date: new Date().toISOString().split('T')[0], id: Date.now() };
    setAnnouncements([newAnnouncementWithDate, ...announcements]);
    setOpenNewAnnouncement(false);
    setNewAnnouncement({ title: '' });
  };

  const handleViewStudents = () => setOpenViewStudents(true);
  const handleGradeAssignments = () => setOpenGradeAssignments(true);
  const handleScheduleClass = () => setOpenScheduleClass(true);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>Teacher Dashboard</Typography>
        <Grid container spacing={3}>
          {/* Courses Overview */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <ClassIcon sx={{ mr: 1 }} /> My Courses
              </Typography>
              <List>
                {courses.map((course) => (
                  <ListItem key={course.id}>
                    <ListItemText primary={course.name} secondary={`${course.students} students`} />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleManageCourses}>
                Manage Courses
              </Button>
            </Paper>
          </Grid>

          {/* Upcoming Assignments */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ mr: 1 }} /> Upcoming Assignments
              </Typography>
              <List>
                {assignments.map((assignment) => (
                  <ListItem key={assignment.id}>
                    <ListItemText
                      primary={assignment.title}
                      secondary={`${assignment.course} - Due: ${assignment.dueDate}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleNewAssignment}>
                Create New Assignment
              </Button>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth startIcon={<PeopleIcon />} onClick={handleViewStudents}>
                    View Students
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth startIcon={<ClassIcon />} onClick={handleScheduleClass}>
                    Schedule Class
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth startIcon={<AssignmentIcon />} onClick={handleGradeAssignments}>
                    Grade Assignments
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth startIcon={<AnnouncementIcon />} onClick={handleNewAnnouncement}>
                    Make Announcement
                  </Button>
                </Grid>
                
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Announcements */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <AnnouncementIcon sx={{ mr: 1 }} /> Recent Announcements
                </Typography>
                <List>
                  {announcements.slice(0, 5).map((announcement) => (
                    <React.Fragment key={announcement.id}>
                      <ListItem>
                        <ListItemText
                          primary={announcement.title}
                          secondary={`Posted on: ${announcement.date}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleViewAllAnnouncements}>View All Announcements</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Manage Courses Dialog */}
      <Dialog open={openManageCourses} onClose={handleCloseManageCourses} fullWidth maxWidth="sm">
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            fullWidth
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Number of Students"
            type="number"
            fullWidth
            value={newCourse.students}
            onChange={(e) => setNewCourse({ ...newCourse, students: parseInt(e.target.value) })}
          />
          {!editingCourse && (
            <List sx={{ mt: 2 }}>
              {courses.map((course) => (
                <ListItem
                  key={course.id}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditCourse(course)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCourse(course.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={course.name} secondary={`${course.students} students`} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseManageCourses}>Cancel</Button>
          <Button onClick={handleAddOrUpdateCourse}>{editingCourse ? 'Update' : 'Add'} Course</Button>
        </DialogActions>
      </Dialog>

      {/* View All Announcements Dialog */}
      <Dialog open={openAllAnnouncements} onClose={() => setOpenAllAnnouncements(false)} fullWidth maxWidth="sm">
        <DialogTitle>All Announcements</DialogTitle>
        <DialogContent>
          <List>
            {announcements.map((announcement) => (
              <React.Fragment key={announcement.id}>
                <ListItem>
                  <ListItemText
                    primary={announcement.title}
                    secondary={`Posted on: ${announcement.date}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAllAnnouncements(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* New Assignment Dialog */}
      <Dialog open={openNewAssignment} onClose={() => setOpenNewAssignment(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Assignment Title"
            fullWidth
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course"
            fullWidth
            value={newAssignment.course}
            onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewAssignment(false)}>Cancel</Button>
          <Button onClick={handleAddNewAssignment}>Add Assignment</Button>
        </DialogActions>
      </Dialog>

      {/* New Announcement Dialog */}
      <Dialog open={openNewAnnouncement} onClose={() => setOpenNewAnnouncement(false)} fullWidth maxWidth="sm">
        <DialogTitle>Make New Announcement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Announcement Title"
            fullWidth
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewAnnouncement(false)}>Cancel</Button>
          <Button onClick={handleAddNewAnnouncement}>Post Announcement</Button>
        </DialogActions>
      </Dialog>

      {/* View Students Dialog */}
      <Dialog open={openViewStudents} onClose={() => setOpenViewStudents(false)} fullWidth maxWidth="sm">
        <DialogTitle>View Students</DialogTitle>
        <DialogContent>
          <Typography>This feature is not implemented yet.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewStudents(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Grade Assignments Dialog */}
      <Dialog open={openGradeAssignments} onClose={() => setOpenGradeAssignments(false)} fullWidth maxWidth="sm">
        <DialogTitle>Grade Assignments</DialogTitle>
        <DialogContent>
          <Typography>This feature is not implemented yet.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGradeAssignments(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Class Dialog */}
      <Dialog open={openScheduleClass} onClose={() => setOpenScheduleClass(false)} fullWidth maxWidth="sm">
        <DialogTitle>Schedule Class</DialogTitle>
        <DialogContent>
          <Typography>This feature is not implemented yet.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScheduleClass(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDashboard;