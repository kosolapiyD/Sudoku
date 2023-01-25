import { useState } from 'react';
import Board from '../board/Board';
import './title-page.css';

const easy_puzzle =
  '72..983.4..94...274...17.5..8.96.5...7..82..65..3.1...86..2.9.13.1.4.76..97.3..8.';
const easy_puzzle_completed =
  '72569831461945382743821765918296457397358214654637129886472593135184976229713648.';

const TitlePage = () => {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState('');

  const handleStartClick = () => {
    setStartGame(true);
  };

  const onLevelClick = (e: React.MouseEvent<HTMLElement>) => {
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
      <div className='title-page'>
        <div className='title-page-container'>
          {level.length === 0 ? (
            <>
              <div className='btns resume-btn'>RESUME</div>
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
      {startGame && level.length > 0 && (
        <Board puzzle={easy_puzzle_completed} />
      )}
    </>
  );
};

export default TitlePage;
