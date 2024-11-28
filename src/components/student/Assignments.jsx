import React from 'react';
import { Typography } from '@mui/material';
import Table from '../common/Table';

const Assignments = () => {
  const assignments = [
    { id: 1, title: 'React Hooks', course: 'Introduction to React', dueDate: '2023-06-15' },
    { id: 2, title: 'Async/Await', course: 'Advanced JavaScript', dueDate: '2023-06-20' },
  ];

  const columns = [
    { id: 'title', label: 'Assignment', minWidth: 170 },
    { id: 'course', label: 'Course', minWidth: 170 },
    { id: 'dueDate', label: 'Due Date', minWidth: 100 },
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Assignments
      </Typography>
      <Table columns={columns} data={assignments} />
    </div>
  );
};

export default Assignments;