"use client";

import {
    Box,
    TextField,
} from "@mui/material";

import CustomDialog from "@/shared/dialog/CustomDialog";
import { Category } from "@/app/category/_components/Category";
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

    const expenseForm = useForm<BalanceForm>();
    const incomeForm = useForm<BalanceForm>();

    const handleExpenseOpen = () => {
        expenseForm.setValue("type", AmountType.EXPENSE)
        setOpenExpense(true);
    };

    const handleExpenseClose = () => {
        setOpenExpense(false);
        expenseForm.reset();
    };

    const handleIncomeOpen = () => {
        incomeForm.setValue("type", AmountType.INCOME)
        setOpenIncome(true);
    };

    const handleIncomeClose = () => {
        setOpenIncome(false);
        incomeForm.reset();
    };

    const { execute } = useApi<BalanceForm>(`/balance`);

    const onSubmit = async (data: BalanceForm) => {
        await execute({ ...data, amount: Number(data.amount), createdAt: formatDate(data.createdAt.toString()) }, "POST");

        handleIncomeClose()
        handleExpenseClose()
        refetch();
        expenseForm.reset();
        incomeForm.reset();
    };

    const formFields = (filteredCategories: Category[], form: any) => {
        return (<>
            <TextField
                label="Amount"
                type="number"
                {...form.register("amount", { required: "Amount name is required" })}
                error={!!form.formState.errors.amount}
                helperText={form.formState.errors.amount?.message}
            />

            <FormDatePicker
                name='createdAt'
                label='Create At'
                control={form.control} />

            <FormSelect
                name='category'
                label='Category'
                control={form.control}
                options={filteredCategories.map((category) => ({
                    value: category.id,
                    label: category.name,
                }))} />

            <TextField
                label="Note"
                {...form.register("note")}
            />
        </>)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: '12px', marginTop: "12px" }}>
            <CustomDialog
                buttonTitle='Add Expense'
                title='Add Expense'
                handleOpen={handleExpenseOpen}
                handleClose={handleExpenseClose}
                onSubmit={expenseForm.handleSubmit(onSubmit)}
                open={openExpense}>
                {formFields(categories.filter(category => category.amountType === AmountType.EXPENSE), expenseForm)}
            </CustomDialog>
            <CustomDialog
                buttonTitle='Add Income'
                title='Add Income'
                handleOpen={handleIncomeOpen}
                handleClose={handleIncomeClose}
                onSubmit={incomeForm.handleSubmit(onSubmit)}
                open={openIncome} >
                {formFields(categories.filter(category => category.amountType === AmountType.INCOME), incomeForm)}
            </CustomDialog>
        </Box >
    );
}
