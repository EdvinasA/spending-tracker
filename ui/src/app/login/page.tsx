"use client";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
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
                    display: "flex",
                    flexDirection: "row",
                    width: "800px",
                    height: "500px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        backgroundImage: "url('/login.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "32px",
                        backgroundColor: "#2b2b3c",
                        color: "#ffffff",
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Login To Your Account
                    </Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        slotProps={{
                            input: {
                                sx: {
                                    backgroundColor: "#222020",
                                    borderRadius: "4px",
                                    color: "white",
                                }
                            },
                            inputLabel: {
                                sx: {
                                    color: "#ccc",
                                    "&.Mui-focused": { color: "#fff" }
                                }
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                                "&:hover fieldset": { borderColor: "#888" },
                                "&.Mui-focused fieldset": { borderColor: "#6a4fc1" },
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        slotProps={{
                            input: {
                                sx: {
                                    backgroundColor: "#222020",
                                    borderRadius: "4px",
                                    color: "white",
                                }
                            },
                            inputLabel: {
                                sx: {
                                    color: "#ccc",
                                    "&.Mui-focused": { color: "#fff" },
                                }
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                                "&:hover fieldset": { borderColor: "#888" },
                                "&.Mui-focused fieldset": { borderColor: "#6a4fc1" },
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            height: "40px",
                            transition: "0.3s",
                            "&:hover": { backgroundColor: "#5f3dc4" },
                            "&:active": { transform: "scale(0.98)" },
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        LOGIN
                    </Button>
                    <Typography variant="body2" marginTop={2}>
                        Don't have an account?{" "}
                        <Link href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
