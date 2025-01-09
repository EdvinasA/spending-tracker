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
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>

            {data &&
                < TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Currency</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((category: Category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box >
    );
}