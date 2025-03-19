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
    Container,
    TableFooter,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

import { DatePicker, DateView, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyledTableCell, StyledBodyTableCell } from "@/shared/style-components";
import { Category } from "@/app/category/_components/Category";
import { formatDate } from "@/shared/utils/data-utils";
import BalanceActions from "./BalanceActions";

import utc from 'dayjs/plugin/utc';

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

type DateFilterType = 'day' | 'month' | 'year';

interface DateFilter {
    date: string;
}

const formatDateByFilterType = (date: Dayjs, filterType: DateFilterType): string => {
    switch (filterType) {
        case 'day':
            return date.format('YYYY-MM-DD');
        case 'month':0
            return date.startOf('month').format('YYYY-MM-DD');
        case 'year':
            return date.startOf('year').format('YYYY-MM-DD');
    }
};

const getDatePickerWidth = (filterType: DateFilterType): string => {
    switch (filterType) {
        case 'day':
            return '150px';
        case 'month':
            return '150px';
        case 'year':
            return '100px';
    }
};

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

    const handleFilterTypeChange = (_: React.MouseEvent<HTMLElement>, newFilterType: DateFilterType) => {
        if (!newFilterType) return;
        setFilterType(newFilterType);
        
        const today = dayjs();
        setDateFilter({
            date: formatDateByFilterType(today, newFilterType)
        });
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        
        setDateFilter({
            date: formatDateByFilterType(newValue, filterType)
        });
    };

    const getDatePickerViews = () => {
        switch (filterType) {
            case 'year':
                return ['year'];
            case 'month':
                return ['year', 'month'];
            default:
                return ['year', 'month', 'day'];
        }
    };

    return (
        <Container>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                paddingTop: '12px'
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    alignItems: "center"
                }}>
                    <ToggleButtonGroup
                        value={filterType}
                        exclusive
                        onChange={handleFilterTypeChange}
                        size="small"
                    >
                        <ToggleButton value="day">Day</ToggleButton>
                        <ToggleButton value="month">Month</ToggleButton>
                        <ToggleButton value="year">Year</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{ 
                                    width: getDatePickerWidth(filterType),
                                    transition: 'width 0.2s ease-in-out'
                                }}
                                value={dayjs(dateFilter.date)}
                                onChange={handleDateChange}
                                views={getDatePickerViews() as DateView[]}
                                showDaysOutsideCurrentMonth={false}
                                slotProps={{
                                    textField: {
                                        size: "small"
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
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
                        {!loading && !categoriesLoading && data && (
                            <>
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
                            </>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
            <BalanceActions categories={categories || []} refetch={refetch} />
        </Container>
    );
}
