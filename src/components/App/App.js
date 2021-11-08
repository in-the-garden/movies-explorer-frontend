import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { useLocation, Route, Routes } from 'react-router-dom';

function App() {
  const location = useLocation().pathname;

  return (
    <div className="page">
      <Header location={location}/>
      <Routes>
        <Route exact path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
