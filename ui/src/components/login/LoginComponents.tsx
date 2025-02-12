"use client";

import { Box, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";

export const MainBox = ({ children }: { children: React.ReactNode }) => (
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
        {children}
    </Box>
);



export const LoginContainer = ({ children }: { children: React.ReactNode }) => (
    <Paper
        sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            width: { xs: "90vw", md: "800px" },
            height: { xs: "auto", md: "550px" },
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: 3,
        }}
    >
        {children}
    </Paper>
);


export const ImageBox = () => (
    <Box
        sx={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: { xs: "150px", md: "100%" },
        }}
    >
        <Image
            src="/assets/login.jpg"
            alt="Login Image"
            layout="fill"
            objectFit="cover"
        />
    </Box>
);


export const FormBox = ({ children }: { children: React.ReactNode }) => (
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
        {children}
    </Box>
);