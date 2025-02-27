"use client";
import { useEffect, useState } from "react";
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
import { format } from "date-fns";
import { StyledTableCell, StyledBodyTableCell } from "@/shared/style-components";
import CategoryForm from "@/components/category/CategoryForm";
import { useApi } from "@/shared/use-api/useApi";
import ConfirmDeleteModal from "@/components/category/ConfirmDeleteModal";

export interface Category {
    id: string;
    name: string;
    email: string;
    currency: string;
    createdAt: string;
}

interface CategoryProps {
    userEmail: string;
    token: string;
}

export default function Category({ userEmail, token }: CategoryProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const { data, loading, execute } = useApi<Category[]>(`/category/${userEmail}`, token)

    useEffect(() => {
        if (userEmail) {
            execute();
        }
    }, [userEmail]);

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
                <Alert sx={{ fontWeight: "bold"}} variant="filled" severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                <CategoryForm
                    userEmail={userEmail}
                    refetchDataAction={() => {
                        execute();
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
                                <StyledBodyTableCell>{format(new Date(category.createdAt), "yyyy-MM-dd")}</StyledBodyTableCell>
                                <StyledBodyTableCell>
                                    <ConfirmDeleteModal
                                        categoryId={category.id}
                                        categoryName={category.name}
                                        userEmail={userEmail}
                                        onSuccess={() => {
                                            execute();
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
