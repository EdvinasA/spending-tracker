"use client";

import {
    Button,
    Dialog, DialogTitle, DialogContent,
    DialogActions
} from "@mui/material";
import { ReactNode, useState } from "react";


interface DialogProps {
    buttonTitle: ReactNode
    title: ReactNode;
    children?: ReactNode;
    open: boolean;
    onSubmit: () => void;
    handleOpen: () => void;
    handleClose: () => void;
}

export default function CustomDialog({
    buttonTitle,
    title,
    children,
    open,
    onSubmit,
    handleOpen,
    handleClose,
}: DialogProps) {
        return (
        <>
            <Button variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    minWidth: "130px",
                    height: "48px"
                }}>
                {buttonTitle}
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "text.primary" }}>
                    {title}
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <form onSubmit={onSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            width: "100%",
                            marginTop: "16px"
                        }}>
                        {children}
                        <DialogActions sx={{ gap: "8px" }}>
                            <Button onClick={handleClose}
                                color="error"
                                sx={{
                                    backgroundColor: "error.main",
                                    color: "error.contrastText",
                                    "&:hover": { backgroundColor: "#b83838" }
                                }}>
                                Cancel
                            </Button>

                            <Button type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "success.main",
                                    color: "success.contrastText",
                                    "&:hover": { backgroundColor: "#388e3c" }
                                }}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
