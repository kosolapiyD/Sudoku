import { CircularProgress } from '@mui/material';
import './loader.css';
const Loader = () => {
  return (
    <div className='loader-container'>
      <CircularProgress size={60} color='inherit' />
    </div>
  );
};

export default Loader;
