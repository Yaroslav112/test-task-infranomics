import { MenuItem, Select } from "@mui/material";
import React, { FC } from "react";
import { setSelectedCategory } from "../../store/table-slice";
import { useAppDispatch } from "../../store";

type EventProps = {
  target: {
    value: string;
  };
}

interface SelectedCategoryProps {
  selectedCategory: string | null
}

const selectOptions = [
  { value: 'All', label: 'All' },
  { value: 'tech solutions', label: 'Tech Solutions' },
  { value: 'mobile innovations', label: 'Mobile Innovations' },
  { value: 'home appliances', label: 'Home Appliances' },
];

const SelectComponent: FC<SelectedCategoryProps> = ({ selectedCategory}) => {
  const dispatch = useAppDispatch();

  const handleCategoryChange = (event: EventProps) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const currentCategory = !selectedCategory ? 'All' : selectedCategory;

  return (
    <Select
      value={currentCategory}
      onChange={handleCategoryChange}
    >
      {selectOptions.map((item, index) => (
        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
      ))}
    </Select>
  )
}

export default SelectComponent;
