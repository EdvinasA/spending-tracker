'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6a4fc1',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#9575cd',
            light: '#b39ddb',
            dark: '#6b52b3',
            contrastText: '#ffffff',
        },
        success: {
            main: '#4caf50',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ff9800',
            contrastText: '#ffffff',
        },
        info: {
          main: '#2196f3',
            contrastText: '#ffffff',
        },
        error: {
            main: '#f44336',
            contrastText: '#ffffff',
        },
        background: {
            default: '#242424',
            paper: '#2e2e2e',
        },
        text: {
            primary: '#f0f0f0',
            secondary: '#b39ddb',
            disabled: '#a6a6a6',
        },
        divider: '#444444',
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        fontWeightMedium: 500,
        h4: {
            fontSize: '1.8rem',
        },
        button: {
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(45deg, #5130cd 30%, #6a4fc1 90%)',
                    color: '#ffffff',
                    boxShadow: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    padding: '6px 16px',
                    borderColor: '#ffffff',
                    transition: 'background-color 0.3s, color 0.3s',
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: '#6a4fc1',
                    borderTop: '1px solid #9575cd',
                },
                indicator: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    color: '#b39ddb',
                    "&:hover": {
                        color: '#ffffff',
                    },
                    "&.Mui-selected": {
                        color: '#ffffff',
                    },
                },
            },
        },
    },
});

export default theme;
