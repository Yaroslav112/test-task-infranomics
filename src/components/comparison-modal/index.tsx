import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import ComparisonFeature from "../comparison-dropdown";
import { FC, useState } from "react";
import { modalStyle } from "./styles";
import { SalesDataProps } from "../../helpers/mocked-data";

interface TransitionModalProps {
  data: SalesDataProps[]
}

const buttonStyles = {
  color: 'white',
  padding: '15px',
  textDecoration: 'none',
}

const ComparisonModal: FC<TransitionModalProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button style={buttonStyles} variant="contained" onClick={handleOpen}>Click to compare</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{backdrop: Backdrop}}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <ComparisonFeature data={data} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ComparisonModal
