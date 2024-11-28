// src/context/CourseContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
  
    const dummyCourses = [
      { id: 1, name: 'Mathematics 101', description: 'Introduction to Mathematics', students: [] },
      { id: 2, name: 'Physics 202', description: 'Advanced Physics', students: [] },
    ];
    setCourses(dummyCourses);

    const dummyAssignments = [
      { id: 1, title: 'Math Quiz', description: 'Chapter 1-3 Quiz', dueDate: '2023-06-20', courseId: 1 },
      { id: 2, title: 'Physics Lab Report', description: 'Experiment 1 Report', dueDate: '2023-06-25', courseId: 2 },
    ];
    setAssignments(dummyAssignments);
  }, []);

  const addCourse = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, { ...newCourse, id: Date.now() }]);
  };

  const addAssignment = (newAssignment) => {
    setAssignments(prevAssignments => [...prevAssignments, { ...newAssignment, id: Date.now() }]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
  };

  const updateAssignment = (updatedAssignment) => {
    setAssignments(prevAssignments => prevAssignments.map(assignment => 
      assignment.id === updatedAssignment.id ? updatedAssignment : assignment
    ));
  };

  const deleteCourse = (courseId) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment.id !== assignmentId));
  };

  return (
    <CourseContext.Provider 
      value={{ 
        courses, 
        assignments, 
        addCourse, 
        addAssignment, 
        updateCourse, 
        updateAssignment, 
        deleteCourse, 
        deleteAssignment 
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};