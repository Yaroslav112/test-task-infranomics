import React, { FC, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SalesDataProps } from "../../helpers/mocked-data";

interface ComparisonFeatureProps {
  data: SalesDataProps[];
}

const MAX_ITEMS_TO_COMPARE = 2

const ComparisonFeature: FC<ComparisonFeatureProps> = ({ data}) => {
  const [selectedDataName, setSelectedDataName] = useState<string[]>([]);
  const [chartVisible, setChartVisible] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<typeof selectedDataName>) => {
    const { target: { value } } = event;
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    const updatedValues = selectedValues.slice(0, 2);
    setSelectedDataName(updatedValues);

    setChartVisible(false);
    setTimeout(() => setChartVisible(true), 100);
  };

  const selectedData = data.filter((item: { name: string }) => selectedDataName.includes(item.name));
  const allDataNames = data.map((data: { name: string }) => data.name);

  const currentDataRender = !data.length ? (
    <p style={{ marginLeft: "10px" }}>Data? no data</p>
  ) : allDataNames.map((name: string) => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  ))

  const compareProductsSelect = (selected: string[]) => {
    if (!selected.length) {
      return <em>Select 2 products to compare</em>;
    }

    return selected.join(", ");
  }

  return (
    <div>
      <FormControl sx={{ m: 1 }}>
        <Select
          multiple
          sx={{ marginLeft: "35px" }}
          displayEmpty
          value={selectedDataName}
          onChange={handleChange}
          input={<OutlinedInput/>}
          renderValue={compareProductsSelect}
        >
          {currentDataRender}
        </Select>
      </FormControl>
      {selectedDataName.length === MAX_ITEMS_TO_COMPARE ? (
        <ResponsiveContainer
          width="100%"
          height={420}
          style={{
            opacity: chartVisible ? 1 : 0,
            transition: 'opacity 0.5s ease'
        }}
        >
          <BarChart data={selectedData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="unitsSold" fill="#8884d8"/>
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

export default ComparisonFeature;
