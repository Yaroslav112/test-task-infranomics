export interface SalesDataProps {
  id: number;
  date: string;
  name: string;
  categories: string[];
  revenue: number;
  unitsSold: number;
  profitMargin: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof SalesDataProps;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'revenue',
    numeric: true,
    disablePadding: false,
    label: 'Revenue',
  },
  {
    id: 'unitsSold',
    numeric: true,
    disablePadding: false,
    label: 'Units Sold',
  },
  {
    id: 'profitMargin',
    numeric: true,
    disablePadding: false,
    label: 'Profit Margin',
  },
];
