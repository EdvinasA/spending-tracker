import { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    CircularProgress,
    IconButton, Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApi } from "@/shared/use-api/useApi";

interface ConfirmDeleteModalProps {
    categoryId: string;
    categoryName: string;
    onSuccess: () => void;
    onError: () => void;
}

export default function ConfirmDeleteModal({ categoryId, categoryName, onSuccess, onError }: ConfirmDeleteModalProps) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { execute: deleteExecute, loading } = useApi(`/category/${categoryId}`, "DELETE");

    const handleDelete = async () => {
        setError(null);
        try {
            await deleteExecute();
            onSuccess();
        } catch (err) {
            setError("Failed to delete category. Please try again.");
            onError();
        }
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Delete">
                <IconButton onClick={() => setOpen(true)} color="error">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle
                    sx={{
                        color: "#d32f2f",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    ⚠️ Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "white" }}>
                        Are you sure you want to delete <strong style={{ color: "#ff6b6b" }}>{categoryName}</strong>?
                        This action cannot be undone.
                    </DialogContentText>
                    {error && <DialogContentText style={{ color: "red" }}>{error}</DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{
                            backgroundColor: "#444",
                            color: "white",
                            "&:hover": { backgroundColor: "#555" }
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        sx={{
                            backgroundColor: "#d32f2f",
                            color: "white",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#b71c1c" },
                        }}
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} /> : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
