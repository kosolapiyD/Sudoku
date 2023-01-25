import React, { Fragment, useEffect, useState } from 'react';
import BottomNumbers from '../bottom-numbers/BottomNumbers';
import { TableDataItem } from '../../types';
import { checkSudokuBoardValid } from '../../utils/utils';
import FinishedDialog from '../finished-dialog/FinishedDialog';

type Props = {
  table2D_data: TableDataItem[][];
};

const Table = ({ table2D_data }: Props) => {
  const [tableData, setTableData] = useState<TableDataItem[][]>([]);
  const [chosenCell, setChosenCell] = useState<Partial<TableDataItem>>({});
  const [num, setNum] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  console.log('isGameCompleted in Table:>> ', isGameCompleted);

  useEffect(() => {
    setTableData(table2D_data);
  }, []);

  useEffect(() => {
    if (tableData.length == 0) return;
    const { updatedTableData, completed } = checkSudokuBoardValid(tableData);
    if (updatedTableData.length > 0) {
      setTableData(updatedTableData);
      setIsGameCompleted(completed);
    }
  }, [num]);

  const handleCellClick = (
    e: React.MouseEvent<HTMLElement>,
    cell: TableDataItem
  ) => {
    const elem = e.target as HTMLElement;
    // const cellClicked = cell;
    // console.log('cellClicked :>> ', cellClicked);
    setActiveCell(cell);
  };

  const setActiveCell = (cell: TableDataItem) => {
    // console.log('cell', cell);
    const updatedTableData = tableData?.map((item) =>
      item.map((innerItem) =>
        innerItem === cell
          ? { ...innerItem, active: true }
          : { ...innerItem, active: false }
      )
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
              const { id, value, active, defaultValue, duplicate } = cell;
              return (
                <Fragment key={`c-${idx}`}>
                  <div
                    id={id}
                    className={`cell ${active ? 'active-cell' : ''} ${
                      defaultValue ? 'default-cell' : ''
                    } ${duplicate ? 'duplicate-cell' : ''}`}
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
