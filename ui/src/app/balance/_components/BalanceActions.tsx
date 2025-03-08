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
import { formatDate } from "@/shared/utils/data-utils";
import { useState } from "react";

interface BalanceActionsProps {
    categories: Category[];
    refetch: () => void;
}

interface BalanceForm {
    amount: number;
    category: string;
    createdAt: Date;
    note: string | null;
    type: AmountType;
}

export default function BalanceActions({ categories, refetch }: BalanceActionsProps) {
    const [openExpense, setOpenExpense] = useState<boolean>(false);
    const [openIncome, setOpenIncome] = useState<boolean>(false);

    const handleExpenseOpen = () => {
        setValue("type", AmountType.EXPENSE)
        setOpenExpense(true);
    };

    const handleExpenseClose = () => {
        setOpenExpense(false);
    };

    const handleIncomeOpen = () => {
        setValue("type", AmountType.INCOME)
        setOpenIncome(true);
    };

    const handleIncomeClose = () => {
        setOpenIncome(false);
    };

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
        await execute({ ...data, amount: Number(data.amount), createdAt: formatDate(data.createdAt.toString()) }, "POST");


        handleIncomeClose()
        handleExpenseClose()
        refetch();
        reset();
    };

    const formFields = (filteredCategories: Category[]) => {
        return (<>
            <TextField
                label="Amount"
                type="number"
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
                options={filteredCategories.map((category) => ({
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
                handleOpen={handleExpenseOpen}
                handleClose={handleExpenseClose}
                onSubmit={handleSubmit(onSubmit)}
                open={openExpense}>
                {formFields(categories.filter(category => category.amountType === AmountType.EXPENSE))}
            </CustomDialog>
            <CustomDialog
                buttonTitle={'Add Income'}
                title={'Add Income'}
                handleOpen={handleIncomeOpen}
                handleClose={handleIncomeClose}
                onSubmit={handleSubmit(onSubmit)}
                open={openIncome} >
                {formFields(categories.filter(category => category.amountType === AmountType.INCOME))}
            </CustomDialog>
        </Box >
    );
}
