import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function HomePage() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        // Remove token from localStorage and update state
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 10,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <Typography variant="h3" gutterBottom>
                    {isAuthenticated ? "Welcome to the Application!" : "Please log in to continue."}
                </Typography>
                <Box sx={{ mt: 3 }}>
                    {!isAuthenticated ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                sx={{ mr: 2 }}
                            >
                                Register
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default HomePage;
