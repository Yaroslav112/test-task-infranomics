import React, { FC, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SalesDataProps } from "../../../helpers/mocked-data";
import Spinner from "../../spinner";

interface BarChartComponentProps {
    data: SalesDataProps[];
    isLoading: boolean;
}

interface ChartDataProps {
    category: string;
    value: number;
}

const categories = ['tech solutions', 'mobile innovations', 'home appliances'];

const BarChartComponent:FC<BarChartComponentProps> = ({ data, isLoading }) => {
    const [chartData, setChartData] = useState<ChartDataProps[]>([]);

    useEffect(() => {
        const newChartData = calculateChartData(data);
        setChartData(newChartData);
    }, [data]);

    const calculateChartData = (selectedData: SalesDataProps[]) => {
        return categories.map((category) => {
            const value = selectedData.reduce((acc, row) => {
                return acc + (row.categories.includes(category) ? row.revenue : 0);
            }, 0);

            return {category, value};
        });
    };

    return (
        <>
            {!isLoading ? (
                <ResponsiveContainer style={{ marginTop: "5px" }} width={630} height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            ) : <Spinner size={70} />}
        </>
    )

};

export default BarChartComponent;
