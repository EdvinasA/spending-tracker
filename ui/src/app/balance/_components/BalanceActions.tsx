"use client";

import {
    Box,
    TextField,
} from "@mui/material";

import CustomDialog from "@/shared/dialog/CustomDialog";
import { Category } from "@/app/categories/_components/Category";
import { useForm } from "react-hook-form";
import FormSelect from "@/shared/form-select/FormSelect";
import FormDatePicker from "@/shared/form-date-picker/FormDatePicker";
import { AmountType } from "./Balance";
import { useApi } from "@/shared/use-api/useApi";

interface BalanceActionsProps {
    categories: Category[];
}

interface BalanceForm {
    amount: number;
    category: string;
    createdAt: Date;
    note: string | null;
    type: AmountType;
}

export default function BalanceActions({ categories }: BalanceActionsProps) {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<BalanceForm>();

    const { execute } = useApi<BalanceForm>(`/balance`);

    const onSubmit = async (data: BalanceForm) => {
        await execute(data, "POST");
    };

    const formFields = (amountType: AmountType) => {
        setValue('type', amountType)
        return (<>
            <TextField
                label="Amount"
                {...register("amount", { required: "Amount name is required" })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
            />

            <FormDatePicker
                name='createdAt'
                label='Create At'
                control={control} />

            <FormSelect
                name='category'
                label='Category'
                control={control}
                options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                }))} />

            <TextField
                label="Note"
                {...register("note")}
            />
        </>)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: '12px', marginTop: "12px" }}>
            <CustomDialog
                buttonTitle={'Add Expense'}
                title={'Add Expense'}
                onSubmit={handleSubmit(onSubmit)}>
                {formFields(AmountType.EXPENSE)}
            </CustomDialog>
            <CustomDialog
                buttonTitle={'Add Income'}
                title={'Add Income'}
                onSubmit={handleSubmit(onSubmit)} >
                {formFields(AmountType.INCOME)}
            </CustomDialog>
        </Box >
    );
}
