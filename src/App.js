import { React } from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages';
import ForcesPage from './pages/forces/[id]';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/forces/:id" element={<ForcesPage />} />
      </Routes>
    </div>
  );
}

export default App;
