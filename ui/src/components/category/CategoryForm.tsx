"use client";

import { useForm } from "react-hook-form";
import {Box, Button, TextField, MenuItem, Select, FormControl, FormLabel, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";

interface CategoryFormData {
    name: string;
    currency: string;
}

export default function CategoryForm({ onCategoryAddedAction }: { onCategoryAddedAction: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>();

    const [userEmail, setUserEmail] = useState("");
    const [currency, setCurrency] = useState("EUR");

    useEffect(() => {
        const emailCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("email="))
            ?.split("=")[1];

        if (emailCookie) {
            setUserEmail(decodeURIComponent(emailCookie));
        }
    }, []);


    const onSubmit = async (data: CategoryFormData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: userEmail,
                    currency: currency,
                }),
            });



            if (!response.ok) {
                console.log("Failed to add category");
                return;
            }

            reset();
            onCategoryAddedAction();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "300px",
                marginBottom: "24px",
            }}
        >
            <TextField
                label="Category Name"
                {...register("name", { required: "Category name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <FormControl fullWidth sx={{ marginTop: 0 }}>
                <FormLabel>Currency</FormLabel>
                <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    error={!!errors.currency}
                >
                    <MenuItem value="" disabled>Select currency</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </Select>
                {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
            </FormControl>




            <Button type="submit" variant="contained" color="primary">
                Add Category
            </Button>
        </Box>
    );
}
