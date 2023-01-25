import React from 'react';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { TableDataItem } from '../../types';

type Props = {
  chosenCell: Partial<TableDataItem>;
  onClickAdd: (n: string) => void;
  onClickDelete: () => void;
};
const BottomNumbers = ({ chosenCell, onClickAdd, onClickDelete }: Props) => {
  const numbersCount = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className='bottom-container'>
      <div className='bottom-box'>
        <div
          className={`numbers-wrapper ${
            chosenCell.defaultValue ? 'disabled' : ''
          }`}
        >
          {numbersCount.map((n) => (
            <div
              key={`n-${n}`}
              className='number-box'
              onClick={() => onClickAdd(n)}
            >
              {n}
            </div>
          ))}
        </div>
        <div className='delete-number-wrapper'>
          <div className='delete-num-box'>
            <BackspaceOutlinedIcon onClick={onClickDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNumbers;
