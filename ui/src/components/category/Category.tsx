"use client";
import React, { useState, useEffect } from "react";
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
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async (email: string) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/${email}`);

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchCategories(userEmail).then(r => console.log(r)).catch(console.error);
        }
    }, [userEmail]);

    return (
        <Box sx={{ padding: "16px 16px 0" }}>
            <CategoryForm
                userEmail={userEmail}
                onCategoryAddedAction={() => fetchCategories(userEmail).catch(console.error)}
            />
            <TableContainer component={Paper} sx={{ backgroundColor: "background.paper", borderRadius: "8px" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "background.default" }}>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Currency</StyledTableCell>
                            <StyledTableCell>Created At</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category: Category) => (
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
                                <StyledBodyTableCell>{category.email}</StyledBodyTableCell>
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
