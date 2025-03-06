"use client";
import { useGetFetch } from "@/shared/use-get-fetch/useGetFetch";
import dayjs, { Dayjs } from 'dayjs';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Snackbar,
    Alert,
    Container,
    Divider,
    Button,
    TableFooter,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import { format } from "date-fns";
import { StyledTableCell, StyledBodyTableCell } from "@/shared/style-components";

export interface Balance {
    id: string;
    userId: string;
    category: string;
    amount: number;
    createdAt: string;
    type: AmountType;
    note?: string | null;
}

export enum AmountType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE"
}

export default function Balance() {
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
    // With request also get categories and map id's to categories for correct display
    const { data, loading, refetch } = useGetFetch<Balance[]>('/balance?date=2025-03-03');

    const calculateIncome = (data: Balance[]) => {
        return data
            .filter(item => item.type === AmountType.INCOME)
            .reduce((sum, item) => sum + item.amount, 0);
    }

    const calculateExpense = (data: Balance[]) => {
        return data
            .filter(item => item.type === AmountType.EXPENSE)
            .reduce((sum, item) => sum + item.amount, 0);
    }

    return (
        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: '12px'
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{
                            width: "150px",

                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
            </Box>
            <TableContainer component={Paper}
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "8px",
                    maxHeight: "calc(100vh - 240px)",
                    overflow: "auto"
                }}>
                <Table stickyHeader>
                    <TableHead sx={{ backgroundColor: "background.default" }}>
                        <TableRow>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Created At</StyledTableCell>
                            <StyledTableCell>Amount</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && data &&
                            data.map((item: Balance) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "primary.light",
                                            transition: "background-color 0.3s ease",
                                        },
                                        borderBottom: "1px solid #444",
                                    }}
                                >
                                    <StyledBodyTableCell>Salary</StyledBodyTableCell>
                                    <StyledBodyTableCell>{format(new Date(item.createdAt), "yyyy-MM-dd")}</StyledBodyTableCell>
                                    <StyledBodyTableCell>{item.type === AmountType.EXPENSE ? '-' : '+'}{item.amount}$</StyledBodyTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter sx={{ backgroundColor: "background.default", position: "sticky", bottom: 0 }}>
                        {!loading && data && (
                            <>
                                <TableRow>
                                    <StyledBodyTableCell colSpan={2}>Total Income</StyledBodyTableCell>
                                    <StyledBodyTableCell>{calculateIncome(data)}</StyledBodyTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledBodyTableCell colSpan={2}>Total Expenses</StyledBodyTableCell>
                                    <StyledBodyTableCell>{calculateExpense(data)}</StyledBodyTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledBodyTableCell colSpan={2}>Balance</StyledBodyTableCell>
                                    <StyledBodyTableCell>{calculateIncome(data) - calculateExpense(data)}</StyledBodyTableCell>
                                </TableRow>
                            </>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
}
