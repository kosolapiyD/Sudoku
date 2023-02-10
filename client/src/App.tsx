import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TitlePage from './pages/title-page/TitlePage';
import BoardPage from './pages/board-page/BoardPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<TitlePage />} />
          <Route path='/board' element={<BoardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
