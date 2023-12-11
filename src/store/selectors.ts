import { RootState } from "./index";

export const salesData = ((state: RootState) => state.table.salesData);
export const order = ((state: RootState) => state.table.order);
export const orderBy = ((state: RootState) => state.table.orderBy);
export const selectedCategory = ((state: RootState) => state.table.selectedCategory);
export const status = ((state: RootState) => state.table.status)
