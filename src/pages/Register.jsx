import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, MenuItem, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../context/AuthContext';

const BackgroundContainer = styled(Box)({
  background: 'linear-gradient(to right, #74ebd5, #9face6)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
});

const StyledPaper = styled(Paper)({
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '16px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
});

const StyledButton = styled(Button)({
  backgroundColor: '#6c63ff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#5753d3',
  },
  padding: '0.75rem',
  fontWeight: 'bold',
  borderRadius: '8px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#6c63ff',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, password, role });
    navigate('/');
  };

  return (
    <BackgroundContainer>
      
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" marginBottom="1.5rem">
            Join us by creating your account.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ borderRadius: '8px' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ borderRadius: '8px' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="role"
              label="Role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </StyledButton>
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <StyledLink to="/login">Sign In</StyledLink>
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </BackgroundContainer>
  );
};

export default Register;
