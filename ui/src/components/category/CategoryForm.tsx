"use client";

import { useForm } from "react-hook-form";
import {
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    FormLabel,
    FormHelperText,
    Dialog, DialogTitle, DialogContent,
    DialogActions
} from "@mui/material";
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
    refetchDataAction: () => void;
}

export default function CategoryForm({ userEmail, refetchDataAction }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>();

    const [ currency, setCurrency ] = useState("EUR");
    const [ open, setOpen ] = useState<boolean>(false);

    const { execute } = useApi<CategoryRequest>(`/category`, 'POST');

    const onSubmit = async (data: CategoryFormData) => {
        await execute({
            name: data.name,
            email: userEmail,
            currency: currency,
        }, 'POST')

        reset();
        refetchDataAction();
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{
                minWidth: "130px",
                height: "48px",
            }}>
                Add Category
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        color: "text.primary",
                    }}
                >
                    Add New Category
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            width: "100%",
                            marginTop: "16px",
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

                        <DialogActions sx={{ gap: "8px"}}>
                            <Button
                                onClick={() => setOpen(false)}
                                color="error"
                                sx={{
                                    backgroundColor: "error.main",
                                    color: "error.contrastText",
                                    "&:hover": { backgroundColor: "#b83838" }
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "success.main",
                                    color: "success.contrastText",
                                    "&:hover": { backgroundColor: "#388e3c" }
                                }}
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
