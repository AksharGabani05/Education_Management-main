import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from '../context/DataContext';
import UserManagement from '../components/admin/UserManagement';
import CourseManagement from '../components/admin/CourseManagement';


const drawerWidth = 240;

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedTeacher: '',
    username: '',
    role: '',
    enrolledCourses: [],
    teachingCourses: [],
  });

  const { 
    courses = [], 
    users = [], 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    addUser, 
    updateUser, 
    deleteUser 
  } = useData();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleDialogOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setNewItem(item);
    } else {
      setEditingItem(null);
      setNewItem({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignedTeacher: '',
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
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (activeSection === 'courses') {
      if (editingItem) {
        updateCourse(newItem);
      } else {
        addCourse(newItem);
      }
    } else {
      if (editingItem) {
        updateUser(newItem);
      } else {
        addUser(newItem);
      }
    }
    handleDialogClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeSection === 'courses') {
        deleteCourse(id);
      } else {
        deleteUser(id);
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'courses':
        return (
          <>
            <Typography variant="h4" gutterBottom>
              Courses
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
                  {courses && courses.map((course) => (
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
          </>
        );
      case 'students':
        const students = users.filter(user => user.role === 'student');
        return (
          <>
            <Typography variant="h4" gutterBottom>
              Students
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleDialogOpen()}>
              Add Student
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Enrolled Courses</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students && students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>
                        {student.enrolledCourses && student.enrolledCourses.map(courseId => (
                          <Chip
                            key={courseId}
                            label={courses.find(course => course.id === courseId)?.title}
                            style={{ margin: '2px' }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDialogOpen(student)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(student.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      case 'teachers':
        const teachers = users.filter(user => user.role === 'teacher');
        return (
          <>
            <Typography variant="h4" gutterBottom>
              Teachers
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleDialogOpen()}>
              Add Teacher
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Teaching Courses</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachers && teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.username}</TableCell>
                      <TableCell>
                        {teacher.teachingCourses && teacher.teachingCourses.map(courseId => (
                          <Chip
                            key={courseId}
                            label={courses.find(course => course.id === courseId)?.title}
                            style={{ margin: '2px' }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDialogOpen(teacher)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(teacher.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
        case 'courseManagement':
        return (
          <CourseManagement
            courses={courses}
            users={users}
            addCourse={addCourse}
            updateCourse={updateCourse}
            deleteCourse={deleteCourse}
          />
        );
      case 'userManagement':
        return (
          <UserManagement
            users={users}
            courses={courses}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        );
        default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Courses', icon: <SchoolIcon />, section: 'courses' },
            { text: 'Students', icon: <PersonIcon />, section: 'students' },
            { text: 'Teachers', icon: <PeopleIcon />, section: 'teachers' },
            { text: 'Course Management', icon: <SettingsIcon />, section: 'courseManagement' },
            { text: 'User Management', icon: <SettingsIcon />, section: 'userManagement' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => setActiveSection(item.section)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {renderContent()}
      </Main>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingItem ? `Edit ${activeSection === 'courses' ? 'Course' : 'User'}` : `Add New ${activeSection === 'courses' ? 'Course' : 'User'}`}</DialogTitle>
        <DialogContent>
          {activeSection === 'courses' ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Course Title"
                type="text"
                fullWidth
                variant="standard"
                value={newItem.title}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Course Description"
                type="text"
                fullWidth
                variant="standard"
                value={newItem.description}
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
                value={newItem.startDate}
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
                value={newItem.endDate}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="assigned-teacher-label">Assigned Teacher</InputLabel>
                <Select
                  labelId="assigned-teacher-label"
                  name="assignedTeacher"
                  value={newItem.assignedTeacher}
                  onChange={handleInputChange}
                >
                  {users.filter(user => user.role === 'teacher').map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                value={newItem.username}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={newItem.role}
                  onChange={handleInputChange}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
              </FormControl>
              {newItem.role === 'student' && (
                <FormControl fullWidth margin="dense">
                  <InputLabel id="enrolled-courses-label">Enrolled Courses</InputLabel>
                  <Select
                    labelId="enrolled-courses-label"
                    name="enrolledCourses"
                    multiple
                    value={newItem.enrolledCourses}
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
                                      {newItem.role === 'teacher' && (
                                        <FormControl fullWidth margin="dense">
                                          <InputLabel id="teaching-courses-label">Teaching Courses</InputLabel>
                                          <Select
                                            labelId="teaching-courses-label"
                                            name="teachingCourses"
                                            multiple
                                            value={newItem.teachingCourses}
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
                                    </>
                                  )}
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleDialogClose}>Cancel</Button>
                                  <Button onClick={handleAddOrUpdate}>
                                    {editingItem ? 'Update' : 'Add'}
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Box>
                          );
                        };
                        
                        export default AdminDashboard;