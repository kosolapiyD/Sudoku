import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import Table from '../../components/table/Table';
import { StorageConstants } from '../../constants/storage-constants';
import { TableDataItem } from '../../types';
import {
  buildSudokuBoard,
  getFromStorage,
  setToStorage,
} from '../../utils/utils';
import FinishedDialog from '../../components/finished-dialog/FinishedDialog';

const puzzle =
  '72..983.4..94...274...17.5..8.96.5...7..82..65..3.1...86..2.9.13.1.4.76..97.3..8.';
const puzzle2 =
  '72569831461945382743821765918296457397358214654637129886472593135184976229713648.';

const BoardPage = () => {
  const [boardData, setBoardData] = useState<TableDataItem[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isErr: false, errMsg: '' });

  const { SUDOKU_CHOICE, SUDOKU_TABLE } = StorageConstants;
  const choice = getFromStorage(SUDOKU_CHOICE);

  const fetchSudokuFromApi = async (choice: string) => {
    const resp = await fetch(`http://localhost:5000/${choice}`)
      .then((response) => response.json())
      .catch((error) => {
        setError({ isErr: true, errMsg: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });

    const { puzzle } = resp.response;
    console.log('puzzle :>> ', puzzle);
    setBoardData(buildSudokuBoard(puzzle));
  };

  useEffect(() => {
    if (choice === 'resume') {
      const tableDataFromLS = getFromStorage(SUDOKU_TABLE);
      setBoardData(tableDataFromLS);
      setIsLoading(false);
    } else {
      setToStorage(SUDOKU_CHOICE, 'resume');
      fetchSudokuFromApi(choice);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error.isErr ? (
            <FinishedDialog open={true} message={error.errMsg} />
          ) : (
            boardData.length > 0 && <Table boardData={boardData} />
          )}
        </>
      )}
    </div>
  );
};

export default BoardPage;
