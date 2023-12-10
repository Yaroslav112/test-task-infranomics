import { SalesDataProps } from "./mocked-data";

function sortingHelpers <T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type Order = 'asc' | 'desc';

type SortProps = SalesDataProps & Record<string, number | string>;

export function getSortingComparator(order: Order, orderBy: string): (a: SortProps, b: SortProps) => number {
    if (order === 'desc') {
        return (a, b) => sortingHelpers(a, b, orderBy);
    } else {
        return (a, b) => -sortingHelpers(a, b, orderBy);
    }
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    return [...array].sort(comparator);
}
