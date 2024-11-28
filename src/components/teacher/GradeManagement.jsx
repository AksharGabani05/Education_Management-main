import React, { useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import { CourseContext } from '../teacher/CourseContent';

const GradeManagement = () => {
  const { courses, assignments } = useContext(CourseContext);
  const [grades, setGrades] = useState({});

  const handleGradeChange = (assignmentId, studentId, grade) => {
    setGrades({
      ...grades,
      [assignmentId]: {
        ...grades[assignmentId],
        [studentId]: grade,
      },
    });
  };

  const handleSubmitGrades = () => {
    
    console.log('Submitting grades:', grades);
   
    setGrades({});
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            {assignments.map((assignment) => (
              <TableCell key={assignment.id}>{assignment.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.flatMap((course) =>
            course.students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                {assignments.map((assignment) => (
                  <TableCell key={assignment.id}>
                    <TextField
                      type="number"
                      value={grades[assignment.id]?.[student.id] || ''}
                      onChange={(e) =>
                        handleGradeChange(assignment.id, student.id, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleSubmitGrades} sx={{ mt: 2 }}>
        Submit Grades
      </Button>
    </TableContainer>
  );
};

export default GradeManagement;