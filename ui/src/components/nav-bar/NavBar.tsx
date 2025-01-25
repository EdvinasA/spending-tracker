'use client';
import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HIDDEN_HEADER_PATHS } from '@/shared/constants';

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedTab, setSelectedTab] = useState<string>("Categories");

    useEffect(() => {
        const currentTab = tabs.find((tab) => tab.path === pathname);
        if (currentTab) {
            setSelectedTab(currentTab.value);
        }
    });

    const a11yProps = (name: string) => {
        return {
            id: `simple-tab-${name}`,
            'aria-controls': `simple-tabpanel-${name}`,
        };
    };

    const tabs = [
        { label: "Categories", value: "Categories", path: "/categories" },
        { label: "Expenses", value: "Expenses", path: "/expenses" },
    ];

    const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
        setSelectedTab(tabs[newIndex].value);
        router.push(tabs[newIndex].path);
    };

    return (
        <>
            {!HIDDEN_HEADER_PATHS.includes(pathname) &&
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={tabs.findIndex((tab) => tab.value === selectedTab)}
                        onChange={handleChange}
                        aria-label="Tabs"
                    >
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} {...a11yProps(tab.value)} />
                        ))}
                    </Tabs>
                </Box>
            }
        </>
    );
}
