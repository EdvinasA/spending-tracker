"use client";

import { useForm } from "react-hook-form";
import {
    Button,
    TextField,
    Dialog, DialogTitle, DialogContent,
    DialogActions
} from "@mui/material";
import { useState } from "react";
import { useApi } from "@/shared/use-api/useApi";
import FormSelect from "@/shared/form-select/FormSelect";
import { AmountType } from "@/app/balance/_components/Balance";


interface CategoryFormData {
    name: string;
    amountType: AmountType
}

interface CategoryRequest {
    name: string;
    amountType: AmountType;
}

interface CategoryFormProps {
    refetchDataAction: () => void;
    onError: () => void;
}

export default function CategoryForm({ refetchDataAction, onError }: CategoryFormProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>();

    const [open, setOpen] = useState<boolean>(false);
    const { execute } = useApi<CategoryRequest>(`/category`);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            await execute(data, "POST");

            reset();
            refetchDataAction();
            setOpen(false);
        } catch (err) {
            console.error("Error adding category:", err);
            onError();
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ minWidth: "130px", height: "48px" }}>
                Add Category
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "text.primary" }}>
                    Add New Category
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", marginTop: "16px" }}>
                        <TextField
                            label="Category Name"
                            {...register("name", { required: "Category name is required" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <FormSelect
                            name='amountType'
                            label='Type'
                            control={control}
                            options={[{ value: AmountType.EXPENSE, label: 'Expense' }, { value: AmountType.INCOME, label: 'Income' }]}
                        />

                        <DialogActions sx={{ gap: "8px" }}>
                            <Button onClick={() => setOpen(false)} color="error" sx={{ backgroundColor: "error.main", color: "error.contrastText", "&:hover": { backgroundColor: "#b83838" } }}>
                                Cancel
                            </Button>

                            <Button type="submit" variant="contained" sx={{ backgroundColor: "success.main", color: "success.contrastText", "&:hover": { backgroundColor: "#388e3c" } }}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
