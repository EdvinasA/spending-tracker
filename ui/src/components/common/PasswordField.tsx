"use client";

import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material/TextField";

type PasswordFieldProps = TextFieldProps & {
    label: string;
};

export default function PasswordField({ label, ...props }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            label={label}
            type={showPassword ? "text" : "password"}
            fullWidth
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"
                            sx={{ color: "white"}}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            {...props}
        />
    );
}
