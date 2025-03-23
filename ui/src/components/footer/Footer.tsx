'use client';
import { Box, Typography } from '@mui/material';
import { Copyright } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box sx={{
            padding: 2,
            marginTop: 2,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0
        }}>
            <Copyright sx={{ fontSize: theme.typography.h6.fontSize, color: theme.palette.text.primary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                {currentYear} Spending Tracker. All rights reserved.
            </Typography>
        </Box>
    );
}
