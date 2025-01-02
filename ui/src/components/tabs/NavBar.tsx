'use client'
import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function NavBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs sx={{ backgroundColor: '#494848', borderTop: '1px', borderColor: 'white' }} value={value} onChange={handleChange} aria-label="Tabs">
                    <Tab sx={{
                        '&.Mui-selected': {
                            color: 'white', // Custom text color
                            '&:hover': {
                                color: 'white', // Hover effect
                            },
                        },
                    }} label="Expenses" {...a11yProps(0)} />
                </Tabs>
            </Box>
        </Box>
    );
}