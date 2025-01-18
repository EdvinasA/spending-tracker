'use client';
import { styled, TableCell } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    borderBottom: `2px solid ${theme.palette.divider}`,
}));

export default StyledTableCell;
