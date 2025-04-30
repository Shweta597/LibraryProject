import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                email,
                password
            });

            if (response.data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', response.data.token);
                setMessage("Login successful!");
                navigate('/'); // Redirect to the home page after login
            } else {
                setMessage("Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Login failed. Please check your credentials.");
            } else {
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
                {message && (
                    <Alert severity={message === "Login successful!" ? "success" : "error"} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

export default LoginForm;
