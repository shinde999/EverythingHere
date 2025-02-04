import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Container, 
  Box 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('Logindata');
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Card 
                    elevation={3}
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        padding: 3
                    }}
                >
                    <CardContent>
                        <Typography 
                            variant="h5" 
                            component="div" 
                            gutterBottom
                            sx={{ mb: 3 }}
                        >
                            Are you sure you want to logout?
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<LogoutIcon />}
                            onClick={handleLogout}
                            size="large"
                            sx={{
                                minWidth: 200,
                                padding: '12px 24px',
                                textTransform: 'none'
                            }}
                        >
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Logout;