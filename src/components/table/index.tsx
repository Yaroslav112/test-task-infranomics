import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHeader from "../table-header";
import TableBody from "@mui/material/TableBody";
import React, { FC, Key, MouseEvent } from "react";
import CustomTableRow from "../table-row";
import Table from "@mui/material/Table";
import { SalesDataProps } from "../../helpers/mocked-data";
import { setOrder, setOrderBy } from "../../store/table-slice";
import { useAppDispatch } from "../../store";

interface TableComponentProps {
  order: 'asc' | 'desc',
  orderBy: string,
  sortedRows: SalesDataProps[]
}

const TableComponent: FC<TableComponentProps> = ({ order, orderBy, sortedRows}) => {
  const dispatch = useAppDispatch();

  const handleRequestSort = (_: any, property: keyof SalesDataProps) => {
    const isAsc = orderBy === property && order === 'asc';

    dispatch(setOrder(isAsc ? 'desc' : 'asc'));
    dispatch(setOrderBy(property));
  };

  return (
    <Paper sx={{ width: 'auto', mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 580, borderRadius: "10px" }} aria-labelledby="tableTitle">
          <TableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedRows.map((row: SalesDataProps, index: Key) => (
              <CustomTableRow key={index} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TableComponent;
