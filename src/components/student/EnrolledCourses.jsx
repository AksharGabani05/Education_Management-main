import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const EnrolledCourses = () => {
  const courses = [
    { id: 1, title: 'Introduction to React', instructor: 'John Doe' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith' },
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Enrolled Courses
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id}>
            <ListItemText 
              primary={course.title} 
              secondary={`Instructor: ${course.instructor}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EnrolledCourses;