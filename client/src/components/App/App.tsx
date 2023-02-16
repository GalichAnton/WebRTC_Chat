import './App.css';
import { Route, Routes } from 'react-router';
import { Home } from '../../pages/Home';
import { Room } from '../../pages/Room';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
