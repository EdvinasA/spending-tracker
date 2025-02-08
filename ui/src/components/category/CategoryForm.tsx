"use client";

import { useForm } from "react-hook-form";
import { Button, TextField, MenuItem, Select, FormControl, FormLabel, FormHelperText } from "@mui/material";
import { useState } from "react";

interface CategoryFormData {
    name: string;
    currency: string;
}

interface CategoryFormProps {
    userEmail: string;
    onCategoryAddedAction: () => void;
}

const currencies = [
    { value: "EUR", label: "Euro (€)" },
    { value: "USD", label: "US Dollar ($)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CHF", label: "Swiss Franc (CHF)" },
    { value: "NOK", label: "Norwegian Krone (NOK)" },
    { value: "SEK", label: "Swedish Krona (SEK)" },
    { value: "DKK", label: "Danish Krone (DKK)" },
    { value: "PLN", label: "Polish Zloty (PLN)" },
    { value: "HUF", label: "Hungarian Forint (HUF)" },
    { value: "CZK", label: "Czech Koruna (CZK)" }
];


export default function CategoryForm({ userEmail, onCategoryAddedAction }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>();

    const [currency, setCurrency] = useState("EUR");

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
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
