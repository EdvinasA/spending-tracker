import { Box, Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
    return (
        <Box sx={{
            textAlign: 'center',
            padding: 2,
            backgroundColor: '#1a1a1a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1
        }}>
            <CopyrightIcon sx={{ fontSize: 18, color: 'white' }} />
            <Typography variant="body2" color="white">
                2025 Spending Tracker. All rights reserved.
            </Typography>
        </Box>


    );
}
