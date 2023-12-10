import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React, { FC } from "react";
import { SalesDataProps } from "../../../helpers/mocked-data";
import Spinner from "../../spinner";

interface LineChartProps {
    date: string;
    revenue: number;
}

interface LineChartDataProps {
    data: SalesDataProps[]
    isLoading: boolean
}

const LineChartComponent:FC<LineChartDataProps> = ({ data, isLoading }) => {
    const lineChartData = data?.map((row: LineChartProps) => ({
        date: row.date,
        revenue: row.revenue,
    }));

    return (
        <>
            {!isLoading ? (
                <ResponsiveContainer width={580} height={304}>
                    <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            ) : <Spinner size={70} />}
        </>
    )
}

export default LineChartComponent;
