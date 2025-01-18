'use client';
import { styled, TableCell, TableCellProps } from "@mui/material";

const StyledBodyTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'normal',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default StyledBodyTableCell;
