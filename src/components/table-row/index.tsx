import React, { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SalesDataProps } from '../../helpers/mocked-data';

interface CustomTableRowProps {
    row: SalesDataProps;
}

const CustomTableRow:FC<CustomTableRowProps> = ({ row }) => {
    return (
        <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
            <TableCell component="th" id={row.id.toString()} scope="row" padding="normal">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.revenue}</TableCell>
            <TableCell align="right">{row.unitsSold}</TableCell>
            <TableCell align="right">{row.profitMargin}</TableCell>
        </TableRow>
    );
};

export default CustomTableRow;
