'use client'
import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';

export default function NavBar() {
    const [selectedTab, setSelectedTab] = React.useState<string>("Categories");

    const a11yProps = (name: string) => {
        return {
            id: `simple-tab-${name}`,
            'aria-controls': `simple-tabpanel-${name}`,
        };
    }
    
    const tabs = [
        { label: "Categories", value: "Categories" },
        { label: "Expenses", value: "Expenses" },
    ];

    const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
        setSelectedTab(tabs[newIndex].value);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    sx={{
                        backgroundColor: '#494848',
                        borderTop: '1px',
                        borderColor: 'white'
                    }}
                    value={tabs.findIndex((tab) => tab.value === selectedTab)}
                    onChange={handleChange}
                    aria-label="Tabs">
                    {tabs.map((tab, index) => (
                        <Tab
                            sx={{
                                '&.Mui-selected': {
                                    color: 'white'
                                },
                            }}
                            key={index}
                            label={tab.label}
                            {...a11yProps(tab.value)} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
}