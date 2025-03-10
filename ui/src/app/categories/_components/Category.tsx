"use client";
import { useState } from "react";
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
} from "@mui/material";
import { StyledTableCell, StyledBodyTableCell } from "@/shared/style-components";
import { useGetFetch } from "@/shared/use-get-fetch/useGetFetch";
import CategoryForm from "./CategoryForm";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { formatDate } from "@/shared/utils/data-utils";
import { AmountType } from "@/app/balance/_components/Balance";

export interface Category {
    id: string;
    name: string;
    email: string;
    currency: string;
    createdAt: string;
    amountType: AmountType;
}

export default function Category() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const { data, loading, refetch } = useGetFetch<Category[]>('/category');

    const handleSnackbarOpen = (message: string, severity: "success" | "error") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    return (
        <Box sx={{ padding: "16px 16px 0" }}>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert sx={{ fontWeight: "bold" }} variant="filled" severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                <CategoryForm
                    refetchDataAction={() => {
                        refetch();
                        handleSnackbarOpen("Category added successfully", "success");
                    }}
                    onError={() => handleSnackbarOpen("Failed to add category", "error")}
                />
            </Box>
            <TableContainer component={Paper} sx={{ backgroundColor: "background.paper", borderRadius: "8px" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "background.default" }}>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Currency</StyledTableCell>
                            <StyledTableCell>Created At</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
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
                                <StyledBodyTableCell>{formatDate(category.createdAt)}</StyledBodyTableCell>
                                <StyledBodyTableCell>
                                    <ConfirmDeleteModal
                                        categoryId={category.id}
                                        categoryName={category.name}
                                        onSuccess={() => {
                                            refetch();
                                            handleSnackbarOpen("Category deleted successfully", "success");
                                        }}
                                        onError={() => handleSnackbarOpen("Failed to delete category", "error")}
                                    />
                                </StyledBodyTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
