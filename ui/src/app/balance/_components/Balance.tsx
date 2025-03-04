"use client";
import { useGetFetch } from "@/shared/use-get-fetch/useGetFetch";
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
} from "@mui/material";

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
        <Box sx={{
            fontSize: '32px'
        }}>
            {!loading && data &&
                <Container>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <div>Income</div>
                        <div>{calculateIncome(data)}</div>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <div>Expenses</div>
                        <div>{calculateExpense(data)}</div>
                    </Box>
                    <Divider sx={{
                        background: 'white'
                    }} />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <div>Balance</div>
                        <div>{calculateIncome(data) - calculateExpense(data)}</div>
                    </Box>
                </Container>
            }
        </Box>
    );
}
