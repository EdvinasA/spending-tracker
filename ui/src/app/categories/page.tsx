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
    Box, Stack, Button,
} from '@mui/material';
import { cookies } from 'next/headers';
import { format } from 'date-fns';

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
                            sx={{ backgroundColor: 'background.default' }}>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #444',
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #444',
                                    }}
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #444',
                                    }}
                                >
                                    Currency
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #444',
                                    }}
                                >
                                    Created At
                                </TableCell>
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
                                    <TableCell sx={{ color: 'text.primary' }}>{category.name}</TableCell>
                                    <TableCell sx={{ color: 'text.primary' }}>{category.email}</TableCell>
                                    <TableCell sx={{ color: 'text.primary' }}>{category.currency}</TableCell>
                                    <TableCell sx={{ color: 'text.primary' }}>
                                        {format(new Date(category.createdAt), 'yyyy-MM-dd')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box >
    );
}