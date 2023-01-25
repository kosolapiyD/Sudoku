import { useState } from 'react';
import { TableDataItem } from '../../types';
import Table from '../table/Table';
import './board.css';
import TitlePage from '../title-page/TitlePage';

type Props = {
  puzzle: string;
};
const Board = ({ puzzle }: Props) => {
  const tableSize = 9;
  const arr = puzzle.split('');

  const table2Darray = [];
  while (arr.length) table2Darray.push(arr.splice(0, tableSize));
  // const matrix = new Array(tableSize).fill(0).map(() => new Array(tableSize));
  const table2D_data: TableDataItem[][] = table2Darray.map((item, idx) =>
    item.map((innerItem, innerIdx) => ({
      id: `row${idx + 1}_td${innerIdx + 1}`,
      active: false,
      value: innerItem === '.' ? '' : innerItem,
      defaultValue: innerItem === '.' ? false : true,
      duplicate: false,
    }))
  );

  return <div>{table2D_data && <Table table2D_data={table2D_data} />}</div>;
};

export default Board;
