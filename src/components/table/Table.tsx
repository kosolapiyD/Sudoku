import React, { Fragment, useEffect, useState } from 'react';
import BottomNumbers from '../bottom-numbers/BottomNumbers';
import { TableDataItem } from '../../types';
import { checkSudokuBoardValid, setToStorage } from '../../utils/utils';
import FinishedDialog from '../finished-dialog/FinishedDialog';

import './table.css';
import { StorageConstants } from '../../constants/storage-constants';

type Props = {
  boardData: TableDataItem[][];
};

const Table = ({ boardData }: Props) => {
  const [tableData, setTableData] = useState<TableDataItem[][]>([]);
  const [chosenCell, setChosenCell] = useState<Partial<TableDataItem>>({});
  const [num, setNum] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const { SUDOKU_TABLE, SUDOKU_TABLE_COMPLETED } = StorageConstants;

  useEffect(() => {
    setTableData(boardData);
    setToStorage(SUDOKU_TABLE, boardData);
  }, []);

  useEffect(() => {
    if (tableData.length == 0) return;
    const { updatedTableData, completed } = checkSudokuBoardValid(tableData);
    if (updatedTableData.length > 0) {
      setToStorage(SUDOKU_TABLE, updatedTableData);
      completed && localStorage.removeItem(SUDOKU_TABLE);
      setTableData(updatedTableData);
      setIsGameCompleted(completed);
      setToStorage(SUDOKU_TABLE_COMPLETED, completed);
    }
  }, [num]);

  const handleCellClick = (
    e: React.MouseEvent<HTMLElement>,
    cell: TableDataItem
  ) => {
    const elem = e.target as HTMLElement;
    setAllRelatedAndActiveCells(cell);
  };

  const setAllRelatedAndActiveCells = (cell: TableDataItem) => {
    const activeRowNumber = cell.id.split('_')[0];
    const activeCellNumber = cell.id.split('_')[1].slice(-1);
    const updatedTableData = tableData?.map((item) =>
      item.map((innerItem) => {
        const innerItemCellNumber = innerItem.id.split('_')[1].slice(-1);

        return innerItemCellNumber === activeCellNumber ||
          innerItem.id.includes(activeRowNumber)
          ? {
              ...innerItem,
              relatedToActive: true,
              active: innerItem === cell ? true : false,
            }
          : {
              ...innerItem,
              relatedToActive: false,
              active: innerItem === cell ? true : false,
            };
      })
    );
    setChosenCell(cell);
    setTableData(updatedTableData);
  };

  const handleBottomNumberClick = (n: string) => {
    // console.log('bottom number click :>> ', n);
    const updatedTableData = tableData?.map((item) =>
      item.map((innerItem) =>
        innerItem.active === true && innerItem.defaultValue === false
          ? { ...innerItem, value: n }
          : innerItem
      )
    );
    setTableData(updatedTableData);
    setNum(!num);
  };

  const handleBottomDeleteClick = () => {
    const updatedTableData = tableData?.map((item) =>
      item.map((innerItem) =>
        innerItem.active === true &&
        innerItem.defaultValue === false &&
        innerItem.value !== ''
          ? { ...innerItem, value: '' }
          : innerItem
      )
    );
    setTableData(updatedTableData);
    setNum(!num);
  };

  const renderBorders = (idx: number, border: string) =>
    (idx + 1) % 3 === 0 &&
    idx < 7 &&
    (border === 'v' ? (
      <div className='horizontal-border'></div>
    ) : (
      <div className='vertical-border'>
        <div className='inner-vertical-border'></div>
      </div>
    ));

  const Rows = () => (
    <>
      {tableData?.map((r, r_idx) => (
        <Fragment key={`r-${r_idx}`}>
          <div className='row' id={`row-${r_idx + 1}`}>
            {r.map((cell, idx) => {
              // cells rendering
              const {
                id,
                value,
                active,
                defaultValue,
                duplicate,
                relatedToActive,
              } = cell;
              return (
                <Fragment key={`c-${idx}`}>
                  <div
                    id={id}
                    className={`cell ${active ? 'active-cell' : ''} ${
                      defaultValue ? 'default-cell' : ''
                    } ${duplicate ? 'duplicate-cell' : ''} ${
                      relatedToActive ? 'related-to-active-cell' : ''
                    }`}
                    onClick={(e) => {
                      handleCellClick(e, cell);
                    }}
                  >
                    {value}
                  </div>
                  {renderBorders(idx, 'h')}
                </Fragment>
              );
            })}
          </div>
          {renderBorders(r_idx, 'v')}
        </Fragment>
      ))}
    </>
  );

  return (
    <div className='table-container'>
      <div className='table-wrapper'>
        <div id='table'>
          <div>
            <Rows />
          </div>
        </div>
      </div>
      <BottomNumbers
        chosenCell={chosenCell}
        onClickAdd={(n) => handleBottomNumberClick(n)}
        onClickDelete={handleBottomDeleteClick}
      />
      {isGameCompleted ? <FinishedDialog open={true} /> : null}
    </div>
  );
};

export default Table;
