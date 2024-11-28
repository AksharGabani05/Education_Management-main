import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to React', description: 'Learn the basics of React development', startDate: '2023-06-01', endDate: '2023-08-31', assignedTeacher: 1 },
    { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript concepts', startDate: '2023-07-01', endDate: '2023-09-30', assignedTeacher: 2 },
    { id: 3, title: 'Web Design Fundamentals', description: 'Learn the principles of effective web design', startDate: '2023-08-01', endDate: '2023-10-31', assignedTeacher: 3 },
    { id: 4, title: 'Database Management', description: 'Understand database design and SQL', startDate: '2023-09-01', endDate: '2023-11-30', assignedTeacher: 4 },
    { id: 5, title: 'Mobile App Development', description: 'Create apps for iOS and Android', startDate: '2023-10-01', endDate: '2023-12-31', assignedTeacher: 5 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', role: 'student', enrolledCourses: [1, 3] },
    { id: 2, username: 'jane_smith', role: 'student', enrolledCourses: [2, 4] },
    { id: 3, username: 'bob_johnson', role: 'student', enrolledCourses: [1, 5] },
    { id: 4, username: 'alice_williams', role: 'student', enrolledCourses: [3, 4] },
    { id: 5, username: 'charlie_brown', role: 'student', enrolledCourses: [2, 5] },
    { id: 6, username: 'david_miller', role: 'teacher', teachingCourses: [1] },
    { id: 7, username: 'emma_davis', role: 'teacher', teachingCourses: [2] },
    { id: 8, username: 'frank_wilson', role: 'teacher', teachingCourses: [3] },
    { id: 9, username: 'grace_taylor', role: 'teacher', teachingCourses: [4] },
    { id: 10, username: 'henry_anderson', role: 'teacher', teachingCourses: [5] },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'David Miller' },
    { id: 2, name: 'Emma Davis' },
    { id: 3, name: 'Frank Wilson' },
    { id: 4, name: 'Grace Taylor' },
    { id: 5, name: 'Henry Anderson' },
  ]);

  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: Date.now() }]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
  };

  const deleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
    if (user.role === 'teacher') {
      setTeachers([...teachers, { id: user.id, name: user.username }]);
    }
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    if (updatedUser.role === 'teacher') {
      setTeachers(teachers.map(teacher => teacher.id === updatedUser.id ? { ...teacher, name: updatedUser.username } : teacher));
    }
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setTeachers(teachers.filter(teacher => teacher.id !== userId));
  };

  return (
    <DataContext.Provider value={{ 
      courses, 
      users, 
      teachers, 
      addCourse, 
      updateCourse, 
      deleteCourse, 
      addUser, 
      updateUser, 
      deleteUser 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);