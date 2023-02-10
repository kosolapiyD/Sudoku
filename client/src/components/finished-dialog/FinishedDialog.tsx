import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';

import { useNavigate } from 'react-router';
import './dialog.css';

type Props = {
  open: boolean;
};

const FinishedDialog = ({ open }: Props) => {
  const [isOpen, setIsOpen] = useState(open);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <Backdrop
      sx={{
        backgroundColor: '#15accf5e',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
      onClick={handleClose}
    >
      <div className='dialog-wrapper'>
        <h3>You Finished Sudoku!</h3>
        <div className='new-game-btn'>MAIN MENU</div>
      </div>
    </Backdrop>
  );
};

export default FinishedDialog;
