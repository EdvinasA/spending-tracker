"use client";

import { Box, Paper, Typography } from "@mui/material";

export default function RegisterPage() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "background.default",
            }}
        >
            <Paper
                sx={{
                    width: "400px",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Register a New Account
                </Typography>
            </Paper>
        </Box>
    );
}
