import { TableDataItem } from '../types';

export const checkSudokuBoardValid = (tableData: TableDataItem[][]) => {
  const duplicatesIDsArray: TableDataItem[] = [];

  const getDuplicateCells = (
    arr: TableDataItem[],
    duplicateCell: number,
    tableData: TableDataItem[][]
  ) => {
    // find the id of both duplicate cells
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === duplicateCell.toString()) {
        const elem = arr[i];

        for (let t = 0; t < tableData.length; t++) {
          for (let t2 = 0; t2 < tableData[t].length; t2++) {
            const element = tableData[t][t2];

            if (elem.id === element.id) {
              duplicatesIDsArray.push(element);
            }
          }
        }
      }
    }
  };

  const rowSet = new Set();
  const columnSet = new Set();
  const boxSet = new Set();

  // cheking at the end for no empty values
  let isEmptyValue;

  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];
    // * =================== CHECK FOR EMPTY VALUES =================== * //
    if (row.find((empty) => empty.value === '')) {
      isEmptyValue = true;
    }

    // this arrays is for finding the second duplicate cell
    const eachRowValuesArray = [];
    const eachColValuesArray = [];
    const eachBoxValuesArray = [];

    for (let j = 0; j < row.length; j++) {
      // * =================== ROW DUPLICATES CALC =================== * //
      const rowTdValue = +row[j].value;
      const rowTdObj = row[j];
      eachRowValuesArray.push(rowTdObj);
      if (rowTdValue) {
        // if has duplicates
        if (rowSet.has(rowTdValue)) {
          getDuplicateCells(eachRowValuesArray, rowTdValue, tableData);
          // console.log(`the duplicate value in a row is ${rowTdValue}`);
        } else {
          rowSet.add(rowTdValue);
        }
      }
      // * ================= COLUMN DUPLICATES CALC ================= * //
      const columnTdValue = +tableData[j][i].value;
      const columnTdObj = tableData[j][i];
      eachColValuesArray.push(columnTdObj);
      if (columnTdValue) {
        // if has duplicates
        if (columnSet.has(columnTdValue)) {
          getDuplicateCells(eachColValuesArray, columnTdValue, tableData);
          // console.log(`the duplicate value in a column is ${columnTdValue}`);
        } else {
          columnSet.add(columnTdValue);
        }
      }
      // * ================= BOX 3x3 DUPLICATES CALC ================ * //
      // push it down 3 rows, to second set of 3 rows (4,5,6) and last set of three rows (7,8,9)
      const boxStep3 = 3 * Math.floor(i / 3);
      // 3 times for 3 boxes still in a first 3 rows
      const boxStep2 = (i * 3) % 9;
      // first step -> 9 times for first top-left box
      // const boxStep1 = table2Darray[Math.floor(j / 3)][j % 3];
      const boxTdValue =
        +tableData[boxStep3 + Math.floor(j / 3)][boxStep2 + (j % 3)].value;
      const boxTdObj =
        tableData[boxStep3 + Math.floor(j / 3)][boxStep2 + (j % 3)];
      eachBoxValuesArray.push(boxTdObj);
      if (boxTdValue) {
        if (boxSet.has(boxTdValue)) {
          getDuplicateCells(eachBoxValuesArray, boxTdValue, tableData);
          // console.log(`the duplicate value in a box is ${boxTdValue}`);
        } else {
          boxSet.add(boxTdValue);
        }
      }
    }

    rowSet.clear();
    columnSet.clear();
    boxSet.clear();
  }

  const uniqueDuplicateIDsArray = duplicatesIDsArray
    .map((item) => item.id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const updatedTableData: TableDataItem[][] = tableData.map((item) => {
    return item.map((innerItem) => {
      const ifIncludes = uniqueDuplicateIDsArray.includes(innerItem.id);
      return { ...innerItem, duplicate: ifIncludes };
    });
  });

  //* completed if => isEmptyValue = false and uniqueDuplicateIDsArray is empty
  const completed =
    !isEmptyValue && uniqueDuplicateIDsArray.length === 0 && true;

  return { updatedTableData, completed };
};

export const buildSudokuBoard = (puzzle: string) => {
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

  return table2D_data;
};

export const getFromStorage = (key: string) => {
  const storage = key === 'sudoku-table' ? localStorage : sessionStorage;
  if (storage.getItem(key)) {
    if (key === 'sudoku-table' || key === 'sudoku-table-completed') {
      console.log(key, 'obj');
      return JSON.parse(storage.getItem(key) || '');
    } else {
      return storage.getItem(key);
    }
  }
};

export const setToStorage = (key: string, value: any) => {
  const storage = key === 'sudoku-table' ? localStorage : sessionStorage;
  if (key === 'sudoku-table' || key === 'sudoku-table-completed') {
    console.log(key, 'obj');
    return storage.setItem(key, JSON.stringify(value));
  } else {
    return storage.setItem(key, value);
  }
};
