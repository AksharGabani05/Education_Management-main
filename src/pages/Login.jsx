import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const BackgroundContainer = styled(Box)({
  background: 'linear-gradient(to right, #667eea, #764ba2)',
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
    backgroundColor: '#574fcf',
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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(username, password);
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          setError('Invalid user role');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" marginBottom="1.5rem">
            Please log in to your account.
          </Typography>
          {error && (
            <Typography color="error" variant="body2" marginBottom="1rem">
              {error}
            </Typography>
          )}
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
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </StyledButton>
            <Typography variant="body2" align="center">
              Don’t have an account?{' '}
              <StyledLink to="/register">Register</StyledLink>
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </BackgroundContainer>
  );
};

export default Login;
