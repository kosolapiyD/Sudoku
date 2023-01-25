import './App.css';
import TitlePage from './components/title-page/TitlePage';

function App() {
  return (
    <div className='App'>
      <div className='title-wrapper'>
        <h2 className='game-title'>Medvedoku</h2>
      </div>
      <TitlePage />
    </div>
  );
}

export default App;
