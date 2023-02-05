import { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import { TableDataItem } from '../../types';
import {
  buildSudokuBoard,
  getFromStorage,
  setToStorage,
} from '../../utils/utils';
import { StorageConstants } from '../../constants/storage-constants';

const puzzle =
  '72..983.4..94...274...17.5..8.96.5...7..82..65..3.1...86..2.9.13.1.4.76..97.3..8.';
const puzzle2 =
  '72569831461945382743821765918296457397358214654637129886472593135184976229713648.';

const BoardPage = () => {
  const [boardData, setBoardData] = useState<TableDataItem[][]>([]);

  const { SUDOKU_CHOICE, SUDOKU_TABLE } = StorageConstants;
  const choice = getFromStorage(SUDOKU_CHOICE);

  const fetchSudokuFromRapidApi = (choice: string) => {
    const randomSeed = Math.floor(Math.random() * 9999);
    const apiKey = process.env.REACT_APP_RAPID_API_KEY as string;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com',
      },
    };

    fetch(
      `https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=${randomSeed}&difficulty=${choice}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log('rapid api resp => ', response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (choice === 'resume') {
      const tableDataFromLS = getFromStorage(SUDOKU_TABLE);
      setBoardData(tableDataFromLS);
    } else {
      setToStorage(SUDOKU_CHOICE, 'resume');
      setBoardData(buildSudokuBoard(puzzle));
      fetchSudokuFromRapidApi(choice);
    }
  }, []);

  return <div>{boardData.length > 0 && <Table boardData={boardData} />}</div>;
};

export default BoardPage;
