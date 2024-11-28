import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';

const dummyUser = {
  id: 1,
  username: 'John Doe',
  enrolledCourses: [1, 2, 3],
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const dummyCourses = [
  { id: 1, title: 'Introduction to React', description: 'Learn the basics of React', progress: 75 },
  { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JS concepts', progress: 50 },
  { id: 3, title: 'Web Design Fundamentals', description: 'Master the art of web design', progress: 90 },
];

const dummyAssignments = [
  { id: 1, courseId: 1, title: 'Build a Todo App', dueDate: '2023-06-15', submitted: false },
  { id: 2, courseId: 2, title: 'Implement Async Functions', dueDate: '2023-06-20', submitted: true },
  { id: 3, courseId: 3, title: 'Create a Responsive Layout', dueDate: '2023-06-25', submitted: false },
];

const dummyGrades = [
  { id: 1, courseId: 1, assignmentId: 1, score: 85 },
  { id: 2, courseId: 2, assignmentId: 2, score: 92 },
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  transition: 'all 0.3s',
  background: 'linear-gradient(to right, #667eea, #764ba2)',
  color: '#fff',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: '#e0e0e0',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#6c63ff',
  },
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6c63ff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#574fcf',
  },
}));

const StudentDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleSubmissionChange = (event) => {
    setSubmissionText(event.target.value);
  };

  const handleSubmitAssignment = () => {
    console.log('Submitting assignment:', submissionText);
    setSelectedAssignment(null);
    setSubmissionText('');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Avatar src={dummyUser.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Welcome, {dummyUser.username}!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 1 }} /> Your Enrolled Courses
          </Typography>
          <Grid container spacing={3}>
            {dummyCourses.map((course) => (
              <Grid item xs={12} sm={6} key={course.id}>
                <StyledCard onClick={() => handleCourseClick(course)}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <ProgressBar variant="determinate" value={course.progress} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Progress: {course.progress}%
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardPaper>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon sx={{ mr: 1 }} /> Upcoming Assignments
            </Typography>
            <List>
              {dummyAssignments.filter((a) => !a.submitted).map((assignment) => (
                <ListItem key={assignment.id} button onClick={() => handleAssignmentClick(assignment)}>
                  <ListItemText primary={assignment.title} secondary={`Due: ${assignment.dueDate}`} />
                </ListItem>
              ))}
            </List>
          </DashboardPaper>
        </Grid>

        <Grid item xs={12}>
          <DashboardPaper>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <GradeIcon sx={{ mr: 1 }} /> Your Grades
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Assignment</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>{dummyCourses.find((c) => c.id === grade.courseId)?.title}</TableCell>
                      <TableCell>{dummyAssignments.find((a) => a.id === grade.assignmentId)?.title}</TableCell>
                      <TableCell>{grade.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashboardPaper>
        </Grid>
      </Grid>

      <Dialog open={!!selectedCourse} onClose={() => setSelectedCourse(null)}>
        <DialogTitle>{selectedCourse?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {selectedCourse?.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Assignments:
          </Typography>
          <List>
            {dummyAssignments
              .filter((assignment) => assignment.courseId === selectedCourse?.id)
              .map((assignment) => (
                <ListItem key={assignment.id} button onClick={() => handleAssignmentClick(assignment)}>
                  <ListItemText primary={assignment.title} secondary={`Due: ${assignment.dueDate}`} />
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedCourse(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!selectedAssignment} onClose={() => setSelectedAssignment(null)}>
        <DialogTitle>{selectedAssignment?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Assignment details would go here.
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Due Date: {selectedAssignment?.dueDate}
          </Typography>
          <TextField
            label="Your Submission"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={submissionText}
            onChange={handleSubmissionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedAssignment(null)}>Cancel</Button>
          <SubmitButton onClick={handleSubmitAssignment} variant="contained">
            Submit Assignment
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDashboard;
