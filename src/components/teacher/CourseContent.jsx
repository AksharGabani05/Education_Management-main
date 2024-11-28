import React, { createContext, useState, useEffect } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Here you would typically fetch courses and assignments from an API
    // For now, we'll use some dummy data
    setCourses([
      { id: 1, name: 'Mathematics 101', description: 'Introduction to Mathematics', students: [] },
      { id: 2, name: 'Physics 202', description: 'Advanced Physics', students: [] },
    ]);

    setAssignments([
      { id: 1, title: 'Math Quiz', description: 'Chapter 1-3 Quiz', dueDate: '2023-06-20', courseId: 1 },
      { id: 2, title: 'Physics Lab Report', description: 'Experiment 1 Report', dueDate: '2023-06-25', courseId: 2 },
    ]);
  }, []);

  const addCourse = (newCourse) => {
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
  };

  const addAssignment = (newAssignment) => {
    setAssignments([...assignments, { ...newAssignment, id: Date.now() }]);
  };

  return (
    <CourseContext.Provider value={{ courses, assignments, addCourse, addAssignment }}>
      {children}
    </CourseContext.Provider>
  );
};