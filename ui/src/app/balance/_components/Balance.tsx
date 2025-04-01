"use client";

import { useGetFetch } from "@/shared/use-get-fetch/useGetFetch";
import dayjs from 'dayjs';
import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
} from "@mui/material";

import { useCallback, useEffect, useMemo, useState } from "react";
import { StyledTableCell, StyledBodyTableCell } from "@/shared/style-components";
import { Category } from "@/app/category/_components/Category";
import { formatDate } from "@/shared/utils/data-utils";
import BalanceActions from "./BalanceActions";

import utc from 'dayjs/plugin/utc';
import BalanceDatePicker from "./BalanceDatePicker";

dayjs.extend(utc);

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

export type DateFilterType = 'day' | 'month' | 'year';

export interface DateFilter {
    date: string;
}

export default function Balance() {
    const [filterType, setFilterType] = useState<DateFilterType>('day');
    const [dateFilter, setDateFilter] = useState<DateFilter>({
        date: dayjs().format('YYYY-MM-DD')
    });
    const { data: categories, loading: categoriesLoading } = useGetFetch<Category[]>('/category');
    const { data, loading, refetch } = useGetFetch<Balance[]>(
        `/balance?date=${dateFilter.date}&view=${filterType}`
    );

    useEffect(() => {
        refetch();
    }, [dateFilter.date, filterType])

    const totalIncome = useMemo(() => {
        if (!data) return 0;
        return data
            .filter(item => item.type === AmountType.INCOME)
            .reduce((sum, item) => sum + item.amount, 0);
    }, [data]);

    const totalExpense = useMemo(() => {
        if (!data) return 0;
        return data
            .filter(item => item.type === AmountType.EXPENSE)
            .reduce((sum, item) => sum + item.amount, 0);
    }, [data]);

    const findCategory = useCallback(
        (id: string): Category | undefined => {
            return categories?.find(category => category.id === id);
        },
        [categories]
    );

    return (
        <Box>
            <BalanceDatePicker
                filterType={filterType}
                setDateFilter={setDateFilter}
                setFilterType={setFilterType}
                dateFilter={dateFilter} />
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
                        {!loading && !categoriesLoading && data &&
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
                                    <StyledBodyTableCell>{findCategory(item.category)?.name}</StyledBodyTableCell>
                                    <StyledBodyTableCell>{formatDate(item.createdAt)}</StyledBodyTableCell>
                                    <StyledBodyTableCell>{item.type === AmountType.EXPENSE ? '- ' : '+ '}{item.amount} $</StyledBodyTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter sx={{ backgroundColor: "background.default", position: "sticky", bottom: 0 }}>
                        <TableRow>
                            <StyledBodyTableCell colSpan={2}>Total Income</StyledBodyTableCell>
                            <StyledBodyTableCell>+ {totalIncome} $</StyledBodyTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledBodyTableCell colSpan={2}>Total Expenses</StyledBodyTableCell>
                            <StyledBodyTableCell>- {totalExpense} $</StyledBodyTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledBodyTableCell colSpan={2}>Balance</StyledBodyTableCell>
                            <StyledBodyTableCell>{totalIncome - totalExpense} $</StyledBodyTableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <BalanceActions categories={categories || []} refetch={refetch} />
        </Box>
    );
}
