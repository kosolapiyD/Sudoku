import React, { useEffect, useState } from 'react';

import './title-page.css';
import { useNavigate } from 'react-router';
import { getFromStorage, setToStorage } from '../../utils/utils';

const TitlePage = () => {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState('');

  const navigate = useNavigate();
  const isGameCompleted = getFromStorage('sudoku-table-completed');

  useEffect(() => {
    if (level.length) {
      setToStorage('sudoku-choice', level);
      navigate('/board');
    }
  }, [level]);

  const handleStartClick = () => {
    setStartGame(true);
  };

  const handleResumeClick = () => {
    setToStorage('sudoku-choice', 'resume');
    navigate('/board');
  };

  const onLevelClick = (e: React.MouseEvent<HTMLElement>) => {
    setToStorage('sudoku-table-completed', JSON.stringify(false));
    const elem = e.target as HTMLElement;
    const levelChosen = elem.innerText;

    switch (levelChosen) {
      case 'EASY':
        setLevel('easy');
        break;
      case 'MEDIUM':
        setLevel('medium');
        break;
      case 'HARD':
        setLevel('hard');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className='title-wrapper'>
        <h2 className='game-title'>Medvedoku</h2>
      </div>
      <div className='title-page'>
        <div className='title-page-container'>
          {level.length === 0 ? (
            <>
              {!isGameCompleted ? (
                <div className='btns resume-btn' onClick={handleResumeClick}>
                  RESUME
                </div>
              ) : null}

              <div className='btns new-game-btn' onClick={handleStartClick}>
                NEW GAME
              </div>
            </>
          ) : null}
          {startGame && level.length === 0 ? (
            <div className='levels-box' onClick={(e) => onLevelClick(e)}>
              <div className='btns-levels btn-easy-level'>EASY</div>
              <div className='btns-levels btn-medium-level'>MEDIUM</div>
              <div className='btns-levels btn-hard-level'>HARD</div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TitlePage;
