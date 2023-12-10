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

const SelectComponent:FC<SelectedCategoryProps> = ({selectedCategory}) => {
    const dispatch = useAppDispatch();

    const handleCategoryChange = (event: EventProps) => {
        dispatch(setSelectedCategory(event.target.value));
    };

    return (
        <Select
            value={!selectedCategory ? 'All' : selectedCategory}
            onChange={handleCategoryChange}
        >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="tech solutions">Tech Solutions</MenuItem>
            <MenuItem value="mobile innovations">Mobile Innovations</MenuItem>
            <MenuItem value="home appliances">Home Appliances</MenuItem>
        </Select>
    )
}

export default SelectComponent;
