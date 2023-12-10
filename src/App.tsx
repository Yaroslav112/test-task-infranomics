import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { getSortingComparator, stableSort } from "./helpers/sorting-helpers";
import { SalesDataProps } from "./helpers/mocked-data";
import LineChartComponent from "./components/charts/line-chart";
import BarChartComponent from "./components/charts/bar-chart";
import { RootState, useAppDispatch, useAppSelector } from "./store";
import TableComponent from "./components/table";
import SelectComponent from "./components/select";
import { fetchSalesData } from "./store/table-slice";
import TransitionModal from "./components/modal";
import {buttonStyles} from "./components/modal/styles";

const cardStyles = {
    backgroundColor: '#c5cbd5',
    backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #b4e8af 100%)',
    backgroundSize: 'cover',
    marginBottom: '20px',
    marginRight: '20px',
    minWidth: '300px',
    height: '100%',
};

const headerCardContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent: 'space-between'
}

const container = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
}

function App() {
    const salesData = useAppSelector((state: RootState) => state.table.salesData);
    const order = useAppSelector((state: RootState) => state.table.order);
    const orderBy = useAppSelector((state: RootState) => state.table.orderBy);
    const selectedCategory = useAppSelector((state: RootState) => state.table.selectedCategory);
    const isLoading = useAppSelector((state: RootState) => state.table.status === 'loading');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSalesData());
    }, []);

    const hasCategory = (item: SalesDataProps, category: string) => item.categories.includes(category);
    const filteredRows = selectedCategory ? salesData.filter((row) => hasCategory(row, selectedCategory)) : salesData;
    // @ts-ignore
    const sortedRows = stableSort(filteredRows, getSortingComparator(order, orderBy));

    return (
        <Box sx={container}>
            <Card sx={cardStyles}>
                <CardContent sx={{ minHeight: '304px' }}>
                    <Box sx={headerCardContainer}>
                        <SelectComponent selectedCategory={selectedCategory} />
                        <TransitionModal data={salesData} />
                        <Button variant="contained">
                            <CSVLink data={sortedRows} style={buttonStyles}>
                                Download CSV File
                            </CSVLink>
                        </Button>
                    </Box>
                    <TableComponent orderBy={orderBy} order={order} sortedRows={sortedRows} />
                </CardContent>
            </Card>
            <Card sx={{ ...cardStyles, minWidth: '612px',minHeight: '344px'  }}>
                <CardContent>
                    <LineChartComponent data={sortedRows} isLoading={isLoading} />
                </CardContent>
            </Card>
            <Card sx={{ ...cardStyles, minWidth: '662px', minHeight: '345px' }}>
                <CardContent>
                    <BarChartComponent data={sortedRows} isLoading={isLoading} />
                </CardContent>
            </Card>
        </Box>
    );
}

export default App;
