"use client";

import { Typography } from "@mui/material";
import Link from "next/link";

interface CustomLinkProps {
    href: string;
    text: string;
}

export default function CustomLink({ href, text }: CustomLinkProps) {
    return (
        <Typography
            component={Link}
            href={href}
            style={{ color: "#1976d2", textDecoration: "none" }}
        >
            {text}
        </Typography>
    );
}