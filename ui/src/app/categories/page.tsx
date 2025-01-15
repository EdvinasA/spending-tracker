import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { cookies } from 'next/headers';
import { format } from 'date-fns';
import { StyledTableCell } from '@/shared/style-components';
import { StyledBodyTableCell } from '@/shared/style-components';


export interface Category {
    id: string;
    name: string;
    email: string;
    currency: string;
    createdAt: string;
}

export default async function Categories() {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/${cookieStore.get('email')?.value}`);
    const data = await response.json()

    return (
        <Box sx={{ padding: '16px 16px 0' }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                }}
                >
                Categories
            </Typography>

            {data &&
                < TableContainer component={Paper} sx={{ backgroundColor: 'background.paper', borderRadius: '8px'}}>
                    <Table>
                        <TableHead
                            sx={{backgroundColor: 'background.default'}}>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Currency</StyledTableCell>
                                <StyledTableCell>Created At</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((category: Category) => (
                                <TableRow
                                    key={category.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            transition: 'background-color 0.3s ease',
                                        },
                                        borderBottom: '1px solid #444',
                                    }}
                                >
                                    <StyledBodyTableCell>{category.name}</StyledBodyTableCell>
                                    <StyledBodyTableCell>{category.email}</StyledBodyTableCell>
                                    <StyledBodyTableCell>{category.currency}</StyledBodyTableCell>
                                    <StyledBodyTableCell>{format(new Date(category.createdAt), 'yyyy-MM-dd')}</StyledBodyTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box >
    );
}