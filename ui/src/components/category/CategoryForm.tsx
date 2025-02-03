"use client";

import { useForm } from "react-hook-form";
import {Box, Button, TextField } from "@mui/material";

interface CategoryFormData {
    name: string;
}

export default function CategoryForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormData>();

    const onSubmit = (data: CategoryFormData) => {
        console.log("Submitted data:", data);
    };

    return (
        <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px", marginBottom: "16px", }}
        >
            <TextField
                label="Category Name"
                {...register("name", { required: "Category name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Category
            </Button>
        </Box>
    );
}

