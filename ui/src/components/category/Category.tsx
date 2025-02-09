"use client";
import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import { format } from "date-fns";
import { StyledTableCell, StyledBodyTableCell } from "@/shared/style-components";
import CategoryForm from "@/components/category/CategoryForm";
import { useApi } from "@/shared/use-api/useApi";

export interface Category {
    id: string;
    name: string;
    email: string;
    currency: string;
    createdAt: string;
}

interface CategoryProps {
    userEmail: string;
}

export default function Category({ userEmail }: CategoryProps) {
    const { data, loading, execute } = useApi<Category[]>(`/category/${userEmail}`)

    useEffect(() => {
        if (userEmail) {
            execute()
        }
    }, [userEmail]);

    return (
        <Box sx={{ padding: "16px 16px 0" }}>
            <CategoryForm
                userEmail={userEmail}
                onCategoryAddedAction={() => execute()}
            />
            <TableContainer component={Paper} sx={{ backgroundColor: "background.paper", borderRadius: "8px" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "background.default" }}>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Currency</StyledTableCell>
                            <StyledTableCell>Created At</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && data && data.map((category: Category) => (
                            <TableRow
                                key={category.id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "primary.light",
                                        transition: "background-color 0.3s ease",
                                    },
                                    borderBottom: "1px solid #444",
                                }}
                            >
                                <StyledBodyTableCell>{category.name}</StyledBodyTableCell>
                                <StyledBodyTableCell>{category.currency}</StyledBodyTableCell>
                                <StyledBodyTableCell>{format(new Date(category.createdAt), "yyyy-MM-dd")}</StyledBodyTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
