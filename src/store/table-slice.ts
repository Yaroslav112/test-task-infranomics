import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SalesDataProps } from '../helpers/mocked-data';

interface AppState {
    order: 'asc' | 'desc';
    orderBy: keyof SalesDataProps;
    selectedCategory: string | null;
    salesData: SalesDataProps[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AppState = {
    order: 'asc',
    orderBy: 'name',
    selectedCategory: null,
    salesData: [],
    status: 'idle',
    error: null,
};

const mockedRows: SalesDataProps[] = [
    {
        id: 1,
        date: '2023-01-01',
        name: 'Laptop',
        categories: ['All', 'tech solutions', 'mobile innovations', 'home appliances'],
        revenue: 305,
        unitsSold: 3.7,
        profitMargin: 67,
    },
    {
        id: 2,
        date: '2023-01-02',
        name: 'Smartphone',
        categories: ['All', 'mobile innovations'],
        revenue: 452,
        unitsSold: 25.0,
        profitMargin: 51,
    },
    {
        id: 3,
        date: '2023-01-03',
        name: 'Smartwatch',
        categories: ['All', 'tech solutions'],
        revenue: 262,
        unitsSold: 16.0,
        profitMargin: 24,
    },
];

export const fetchSalesData = createAsyncThunk('salesData/fetchSalesData', async () => {
    try {
        return await new Promise<SalesDataProps[]>((resolve) => {
            setTimeout(() => {
                resolve(mockedRows);
            }, 500);
        });
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
});

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.order = action.payload;
        },
        setOrderBy: (state, action: PayloadAction<keyof SalesDataProps>) => {
            state.orderBy = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSalesData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.salesData = action.payload;
                state.error = null;
            })
            .addCase(fetchSalesData.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Failed to fetch data';
            });
    },
});

export const {
    setOrder,
    setOrderBy,
    setSelectedCategory
} = tableSlice.actions;

export default tableSlice.reducer;
