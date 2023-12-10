import React, {FC} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface SpinnerProps {
    size: number
}

const Spinner:FC<SpinnerProps> = ({ size }) => {
    return (
        <Box sx={{ display: 'flex'}}>
            <CircularProgress size={size} thickness={3} />
        </Box>
    );
}

export default Spinner;
