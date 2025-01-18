"use client";

import { Box, TextField, Button, Typography, Link } from "@mui/material";

export default function LoginPage() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                textAlign: "center",
            }}
        >
            <Typography variant="h5">Login to Your Account</Typography>
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField label="Password" variant="outlined" type="password" fullWidth />
            <Button variant="contained" color="primary" fullWidth>
                Login
            </Button>
            <Typography variant="body2">
                Don't have an account? <Link href="/register">Sign up</Link>
            </Typography>
        </Box>
    );
}