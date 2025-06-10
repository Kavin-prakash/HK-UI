import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import relevantzlogo from '../Asserts/Images/Relevantz_Logo.png'
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// 24125F
export default function Navbar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky" style={{ backgroundColor: 'white', height: '60px' }}>
                    <Toolbar variant="dense" sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            style={{ height: '50px', width: '250px', marginRight: '20px', borderRadius: '10px' }} // Added margin-right for spacing
                            src={relevantzlogo}
                            alt="Relevantz Logo" // Added alt attribute for accessibility
                        />
                        <Typography variant="h4" color="#24125F" component="div">
                            AI-Powered KPI Extraction & Processing from Capital Call Statements
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
