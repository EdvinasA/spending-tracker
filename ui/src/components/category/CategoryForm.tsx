"use client";

import { useForm } from "react-hook-form";
import { Button, TextField, MenuItem, Select, FormControl, FormLabel, FormHelperText } from "@mui/material";
import { useState } from "react";
import { currencies } from "@/shared/currencies/constants";
import { useApi } from "@/shared/use-api/useApi";


interface CategoryFormData {
    name: string;
    currency: string;
}

interface CategoryRequest {
    name: string;
    email: string;
    currency: string;
}

interface CategoryFormProps {
    userEmail: string;
    refetchData: () => void;
}

export default function CategoryForm({ userEmail, refetchData }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>();

    const [currency, setCurrency] = useState("EUR");

    const { error, execute } = useApi<CategoryRequest>(`/category`, 'POST');

    const onSubmit = async (data: CategoryFormData) => {
        await execute({
            name: data.name,
            email: userEmail,
            currency: currency,
        }, 'POST')

        reset();
        refetchData();

    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                maxWidth: "400px",
                marginBottom: "24px",
            }}
        >
            <TextField
                label="Category Name"
                {...register("name", { required: "Category name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <FormControl fullWidth>
                <FormLabel>Currency</FormLabel>
                <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    variant="outlined"
                    error={!!errors.currency}
                >
                    {currencies.map((curr) => (
                        <MenuItem key={curr.value} value={curr.value}>
                            {curr.label}
                        </MenuItem>
                    ))}
                </Select>
                {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
                Add Category
            </Button>
        </form>
    );
}
